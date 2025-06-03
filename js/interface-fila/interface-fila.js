const fila = new window.FilaEncadeada();
const operacoes = [];

const nomeInput = document.getElementById('nome');
const idadeInput = document.getElementById('idade');
const condicaoSelect = document.getElementById('condicao');
const queueBox = document.getElementById('queueBox');
const operacoesList = document.getElementById('operacoesList');
const countBadge = document.getElementById('countBadge');

function atualizarInterface() {
  const arr = fila.paraVetor();

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
          ${estaNaFrente
            ? '<span class="badge-frente">FRENTE</span>'
            : `<span class="badge-position">Posição ${posicao}</span>`
          }
        </div>
        `;
      })
      .join('');
  }

  countBadge.textContent =
    fila.tamanho + (fila.tamanho === 1 ? ' paciente' : ' pacientes');

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

function enfileirarPaciente() {
  const nome = nomeInput.value.trim();
  const idade = idadeInput.value;
  const condicao = condicaoSelect.value;

  if (!nome || !idade || !condicao) {
    alert('Preencha todos os campos!');
    return;
  }

  fila.enfileirar({ nome, idade, condicao });
  operacoes.unshift(`Adicionar: Adicionado ${nome} à fila`);
  limparCampos();
  atualizarInterface();
}

function desenfileirarPaciente() {
  if (fila.tamanho === 0) {
    alert('Fila vazia!');
    return;
  }
  const p = fila.desenfileirar();
  alert(`Paciente atendido: ${p.nome}`);
  operacoes.unshift(`Atender: Atendido ${p.nome}`);
  atualizarInterface();
}


function espiarPaciente() {
  const p = fila.espiar();
  if (!p) {
    alert('Fila vazia!');
    return;
  }
  operacoes.unshift(`Ver: ${p.nome} está na frente`);
  alert(`Próximo paciente: ${p.nome} (${p.idade} anos) - ${p.condicao}`);
  atualizarInterface();
}

function limparFila() {
  while (fila.tamanho) {
    fila.desenfileirar();
  }
  operacoes.unshift('LIMPAR: Fila esvaziada');
  atualizarInterface();
}

function limparCampos() {
  nomeInput.value = '';
  idadeInput.value = '';
  condicaoSelect.selectedIndex = 0;
}

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

atualizarInterface();
