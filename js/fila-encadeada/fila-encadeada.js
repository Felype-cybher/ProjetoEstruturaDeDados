class No {
  constructor(dado) {
    this.dado = dado;
    this.proximo = null;
  }
}

class FilaEncadeada {
  constructor() {
    this.inicio = null;
    this.fim = null;
    this.tamanho = 0;
  }

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

  espiar() {
    return this.inicio ? this.inicio.dado : null;
  }

  paraVetor() {
    const vetor = [];
    for (let atual = this.inicio; atual; atual = atual.proximo) {
      vetor.push(atual.dado);
    }
    return vetor;
  }
}

window.FilaEncadeada = FilaEncadeada;
