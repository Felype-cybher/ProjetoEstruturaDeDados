const fila = new LinkedQueue();
    const operacoes = [];

    const nomeInput = document.getElementById('nome');
    const idadeInput = document.getElementById('idade');
    const condicaoSelect = document.getElementById('condicao');
    const queueBox = document.getElementById('queueBox');
    const operacoesList = document.getElementById('operacoesList');
    const countBadge = document.getElementById('countBadge');

    function atualizarInterface() {
      const arr = fila.toArray();
      if (arr.length === 0) queueBox.innerHTML = '<div class="text-center text-muted">Fila vazia</div>';
      else {
        queueBox.innerHTML = arr.map((p, idx) => {
          const isFront = idx === 0;
          const posicao = idx + 1;
          return `
            <div class="patient-entry">
              <div class="patient-info">
                <div><strong>${p.nome}</strong></div>
                <div>${p.idade} anos - ${p.condicao}</div>
              </div>
              ${isFront
                ? '<span class="badge-frente">FRENTE</span>'
                : `<span class="badge-position">Posição ${posicao}</span>`}
            </div>
          `;
        }).join('');
      }
      countBadge.textContent = fila.size + (fila.size === 1 ? ' paciente' : ' pacientes');

      if (operacoes.length === 0) operacoesList.innerHTML = '<div class="text-center text-muted">Nenhuma operação realizada</div>';
      else {
        operacoesList.innerHTML = operacoes.map(op => {
          const time = new Date().toLocaleTimeString('pt-BR');
          return `
            <div class="operation-entry">
              <p class="operation-text">${op}</p>
              <span class="timestamp">${time}</span>
            </div>
          `;
        }).join('');
      }
    }

    function enqueuePaciente() {
      const nome = nomeInput.value.trim();
      const idade = idadeInput.value;
      const condicao = condicaoSelect.value;
      if (!nome||!idade||!condicao){
        alert('Preencha todos os campos!');return;
      }
      fila.enqueue({ nome, idade, condicao });
      operacoes.unshift(`ENFILEIRAR: Adicionado ${nome} à fila`);
      limparCampos(); atualizarInterface();
    }

    function dequeuePaciente() {
      if (fila.size===0){
        alert('Fila vazia!');return;
      }
      const p = fila.dequeue();
      operacoes.unshift(`DESENFILEIRAR: Atendido ${p.nome}`);
      atualizarInterface();
    }

    function peekPaciente() {
      const p = fila.peek();
      if (!p){
        alert('Fila vazia!');return;
      }
      operacoes.unshift(`VISUALIZAR: ${p.nome} está na frente`);
      alert(`Próximo paciente: ${p.nome} (${p.idade} anos) - ${p.condicao}`);
      atualizarInterface();
    }

    function clearFila() {
      while(fila.size) fila.dequeue();
      operacoes.unshift('LIMPAR: Fila esvaziada'); atualizarInterface();
    }

    function limparCampos() { nomeInput.value='';idadeInput.value='';condicaoSelect.selectedIndex=0; }

    document.getElementById('btnEnqueue').addEventListener('click', enqueuePaciente);
    document.getElementById('btnDequeue').addEventListener('click', dequeuePaciente);
    document.getElementById('btnPeek').addEventListener('click', peekPaciente);
    document.getElementById('btnClear').addEventListener('click', clearFila);

    atualizarInterface();