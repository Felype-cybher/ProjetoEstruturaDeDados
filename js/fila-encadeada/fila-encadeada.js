// *** js/fila-encadeada/fila-encadeada.js ***

// Classe No (nó da fila)
class No {
  constructor(dado) {
    this.dado = dado;
    this.proximo = null;
  }
}

// Classe FilaEncadeada
class FilaEncadeada {
  constructor() {
    this.inicio = null;
    this.fim = null;
    this.tamanho = 0;
  }

  // Adiciona um elemento ao final da fila
  enfileirar(dado) {
    const no = new No(dado);
    if (!this.inicio) {
      this.inicio = this.fim = no;
    } else {
      this.fim.proximo = no;
      this.fim = no;
    }
    this.tamanho++;
  }

  // Remove e retorna o elemento do início da fila
  desenfileirar() {
    if (!this.inicio) return null;
    const dadoRemovido = this.inicio.dado;
    this.inicio = this.inicio.proximo;
    if (!this.inicio) {
      this.fim = null;
    }
    this.tamanho--;
    return dadoRemovido;
  }

  // Retorna o elemento do início da fila sem removê-lo
  espiar() {
    return this.inicio ? this.inicio.dado : null;
  }

  // Retorna um array com todos os elementos (dado) na fila
  paraVetor() {
    const vetor = [];
    for (let atual = this.inicio; atual; atual = atual.proximo) {
      vetor.push(atual.dado);
    }
    return vetor;
  }
}

// Expondo a classe globalmente para o script de interface poder usar
// (não há necessidade de export/module, basta ficar no escopo global)
window.FilaEncadeada = FilaEncadeada;
