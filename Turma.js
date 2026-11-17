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