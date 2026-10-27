class Aluno {
  nome;
  matricula;
  nota1;
  nota2;
  nota3;
  estado;
  media;

  constructor(nome, matricula, nota1, nota2, nota3) {
    this.nome = nome;
    this.matricula = matricula;
    this.nota1 = nota1;
    this.nota2 = nota2;
    this.nota3 = nota3;
  }

  gerarMedia() {
    let m = (this.nota1 + this.nota2 + this.nota3) / 3;
    this.media = m;
    return m;
  }

  gerarEstado(media) {
    let est;

    if (media < 3) {
      est = 'Reprovado';
    } else if (
      this.nota1 < 4 ||
      this.nota2 < 4 ||
      this.nota3 < 4
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
}

// Array que armazena os alunos cadastrados
let turma = [];

// Cadastra um aluno
function salvar() {
  let nome = document.getElementById('nome').value.trim();
  let matricula = document.getElementById('matricula').value.trim();
  let n1 = document.getElementById('n1').value;
  let n2 = document.getElementById('n2').value;
  let n3 = document.getElementById('n3').value;

  // Verifica se todos os campos foram preenchidos
  if (nome === '' || matricula === '' || n1 === '' || n2 === '' || n3 === '') {
    alert('Preencha todos os campos!');
    return;
  }

  // Converte as notas para números
  n1 = Number(n1);
  n2 = Number(n2);
  n3 = Number(n3);

  // Verifica se as notas estão entre 0 e 10
  if (
    [n1, n2, n3].some((nota) => !Number.isFinite(nota) || nota < 0 || nota > 10)
  ) {
    alert('As notas devem estar entre 0 e 10!');
    return;
  }

  // Cria o objeto Aluno
  let a1 = new Aluno(nome, matricula, n1, n2, n3);

  // Calcula a média e a situação
  let m = a1.gerarMedia();
  a1.gerarEstado(m);

  // Adiciona o aluno à turma
  turma.push(a1);

  alert('Aluno cadastrado com sucesso!');

  // Limpa os campos
  document.getElementById('nome').value = '';
  document.getElementById('matricula').value = '';
  document.getElementById('n1').value = '';
  document.getElementById('n2').value = '';
  document.getElementById('n3').value = '';

  document.getElementById('nome').focus();
}
