// *** js/interface-fila/interface-fila.js ***

// Instancia a fila (classe carregada pelo arquivo anterior)
const fila = new window.FilaEncadeada();
const operacoes = [];

// Captura dos elementos HTML pelos IDs (que já constam no seu HTML)
const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const condicaoSelect = document.getElementById('condicao');
const queueBox = document.getElementById('queueBox');
const operacoesList = document.getElementById('operacoesList');
const countBadge = document.getElementById('countBadge');

// Atualiza toda a interface (lista de pacientes + badge + lista de operações)
function atualizarInterface() {
  const arr = fila.paraVetor();

  // Atualiza área da fila
  if (arr.length === 0) {
    queueBox.innerHTML = '<div class="text-center text-muted">Fila vazia</div>';
  } else {
    queueBox.innerHTML = arr
      .map((p, idx) => {
        const estaNaFrente = idx === 0;
        const posicao = idx + 1;
        return `
        <div class="patient-entry">
          <div class="patient-info">
            <div><strong>${p.nome}</strong></div>
            <div>${p.idade} anos - ${p.condicao}</div>
          </div>
          ${
            estaNaFrente
              ? '<span class="badge-frente">FRENTE</span>'
              : `<span class="badge-position">Posição ${posicao}</span>`
          }
        </div>
        `;
      })
      .join('');
  }

  // Atualiza badge de quantidade
  countBadge.textContent =
    fila.tamanho + (fila.tamanho === 1 ? ' paciente' : ' pacientes');

  // Atualiza lista de operações realizadas
  if (operacoes.length === 0) {
    operacoesList.innerHTML =
      '<div class="text-center text-muted">Nenhuma operação realizada</div>';
  } else {
    operacoesList.innerHTML = operacoes
      .map((op) => {
        const time = new Date().toLocaleTimeString('pt-BR');
        return `
        <div class="operation-entry">
          <p class="operation-text">${op}</p>
          <span class="timestamp">${time}</span>
        </div>
        `;
      })
      .join('');
  }
}

// Função para ler valores dos inputs, enfileirar e registrar operação
function enfileirarPaciente() {
  const nome = nomeInput.value.trim();
  const idade = idadeInput.value;
  const condicao = condicaoSelect.value;

  if (!nome || !idade || !condicao) {
    alert('Preencha todos os campos!');
    return;
  }

  fila.enfileirar({ nome, idade, condicao });
  operacoes.unshift(`ENFILEIRAR: Adicionado ${nome} à fila`);
  limparCampos();
  atualizarInterface();
}

// Função para desenfileirar (atender) e registrar operação
function desenfileirarPaciente() {
  if (fila.tamanho === 0) {
    alert('Fila vazia!');
    return;
  }
  const p = fila.desenfileirar();
  operacoes.unshift(`DESENFILEIRAR: Atendido ${p.nome}`);
  atualizarInterface();
}

// Função para espiar quem está na frente
function espiarPaciente() {
  const p = fila.espiar();
  if (!p) {
    alert('Fila vazia!');
    return;
  }
  operacoes.unshift(`ESPIAR: ${p.nome} está na frente`);
  alert(`Próximo paciente: ${p.nome} (${p.idade} anos) - ${p.condicao}`);
  atualizarInterface();
}

// Função para limpar toda a fila e registrar
function limparFila() {
  while (fila.tamanho) {
    fila.desenfileirar();
  }
  operacoes.unshift('LIMPAR: Fila esvaziada');
  atualizarInterface();
}

// Limpa campos de input após enfileirar
function limparCampos() {
  nomeInput.value = '';
  idadeInput.value = '';
  condicaoSelect.selectedIndex = 0;
}

// Associa eventos aos botões (IDs correspondem exatamente aos do seu HTML)
document
  .getElementById('btnEnqueue')
  .addEventListener('click', enfileirarPaciente);
document
  .getElementById('btnDequeue')
  .addEventListener('click', desenfileirarPaciente);
document
  .getElementById('btnPeek')
  .addEventListener('click', espiarPaciente);
document
  .getElementById('btnClear')
  .addEventListener('click', limparFila);

// Chama pela primeira vez para exibir “Fila vazia” / “Nenhuma operação realizada”
atualizarInterface();
