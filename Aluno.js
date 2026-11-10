
class Aluno {
  #nome;
  #matricula;
  #frequencia;
  #nota1;
  #nota2;
  #nota3;

  estado;
  media;

  constructor(nome, matricula, frequencia, nota1, nota2, nota3) {
    this.#nome = nome;
    this.#matricula = matricula;
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

    this.estado = est;
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

  getNome() { return this.#nome; }
  getMatricula() { return this.#matricula; }
  getFrequencia() { return this.#frequencia; }
  getNota1() { return this.#nota1; }
  getNota2() { return this.#nota2; }
  getNota3() { return this.#nota3; }

  setNome(nome) { this.#nome = nome; }
  setMatricula(matricula) { this.#matricula = matricula; }
  setFrequencia(frequencia) { this.#frequencia = frequencia; }
  setNota1(nota) { this.#nota1 = nota; }
  setNota2(nota) { this.#nota2 = nota; }
  setNota3(nota) { this.#nota3 = nota; }
}


// Nova classe: Turma
class Turma {
  constructor(nome, professor, curso) {
    this.nome = nome;
    this.professor = professor;
    this.curso = curso;

    // Cada turma possui sua própria lista de alunos
    this.alunos = [];
  }

  adicionarAluno(aluno) {
    this.alunos.push(aluno);
  }

  getAlunos() {
    return this.alunos;
  }
}


// Array que armazena todas as turmas
let turmas = [];

// Índice da turma atualmente selecionada
let turmaAtual = null;
