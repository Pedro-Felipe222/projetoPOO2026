class Aluno extends Pessoa {
  #frequencia;
  #nota1;
  #nota2;
  #nota3;

  media;

  constructor(nome, matricula, frequencia, nota1, nota2, nota3) {
      super(nome, matricula, null);
      this.#frequencia = frequencia;
      this.#nota1 = nota1;
      this.#nota2 = nota2;
      this.#nota3 = nota3;
  }

  gerarMedia() {
      let m = (this.#nota1 + this.#nota2 + this.#nota3) / 3;

      this.media = m;

      return m;
  }

  gerarEstado(media) {
      const resultadoFrequencia = this.gerarEstadoFrequencia();

      let est;

      if (!resultadoFrequencia.estFrequencia) {
          est = 'Reprovado por frequência';
      } else if (media < 3) {
          est = 'Reprovado';
      } else if (
          this.#nota1 < 4 ||
          this.#nota2 < 4 ||
          this.#nota3 < 4
      ) {
          est = 'Recuperação';
      } else if (media >= 6) {
          est = 'Aprovado';
      } else {
          est = 'Recuperação';
      }

      this.setEstado(est);

      return est;
  }

  gerarEstadoFrequencia() {
      const aulasTotais = 20;
      const percentual = (this.#frequencia / aulasTotais) * 100;

      return {
          estFrequencia: percentual >= 70,
          percentual: percentual
      };
  }

  getFrequencia() { return this.#frequencia; }
  getNota1() { return this.#nota1; }
  getNota2() { return this.#nota2; }
  getNota3() { return this.#nota3; }

  setFrequencia(frequencia) { this.#frequencia = frequencia; }
  setNota1(nota) { this.#nota1 = nota; }
  setNota2(nota) { this.#nota2 = nota; }
  setNota3(nota) { this.#nota3 = nota; }
}