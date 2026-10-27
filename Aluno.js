
class Aluno {
  nome;
  matricula;
  frequencia;
  nota1;
  nota2;
  nota3;
  estado;
  media;

  constructor(nome, matricula, frequencia, nota1, nota2, nota3) {
    this.nome = nome;
    this.matricula = matricula;
    this.frequencia = frequencia;
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
    const resultadoFrequencia = this.gerarEstadoFrequencia();
    let est;
    if(!resultadoFrequencia.estFrequencia) {
      est = 'Reprovado por frequência';
    } else if (media < 3) {
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

  gerarEstadoFrequencia() {
    const aulasTotais = 20;
    const percentual = (this.frequencia / aulasTotais) * 100;

    return {
      estFrequencia: percentual >= 70,
      percentual: percentual
    };
  }
}


// Array que armazena os alunos cadastrados
let turma = [];

// Cadastra um aluno

function salvar() {
  let nome = document.getElementById('nome').value.trim();
  let matricula = document.getElementById('matricula').value.trim();
  let frequencia = document.getElementById('frequencia').value;
  let n1 = document.getElementById('n1').value;
  let n2 = document.getElementById('n2').value;
  let n3 = document.getElementById('n3').value;

  // Verifica se todos os campos foram preenchidos
  if (
    nome === '' ||
    matricula === '' ||
    frequencia === '' ||
    n1 === '' ||
    n2 === '' ||
    n3 === ''
  ) {
    alert('Preencha todos os campos!');
    return;
  }

  // Converte os valores para números
  frequencia = Number(frequencia);
  n1 = Number(n1);
  n2 = Number(n2);
  n3 = Number(n3);

  // Valida a frequência
  if (
    !Number.isInteger(frequencia) ||
    frequencia < 0 ||
    frequencia > 20
  ) {
    alert('A frequência deve ser um número inteiro entre 0 e 20!');
    return;
  }

  // Valida as notas
  if (
    [n1, n2, n3].some(
      nota => !Number.isFinite(nota) || nota < 0 || nota > 10
    )
  ) {
    alert('As notas devem estar entre 0 e 10!');
    return;
  }

  // Cria o aluno incluindo a frequência
  let a1 = new Aluno(
    nome,
    matricula,
    frequencia,
    n1,
    n2,
    n3
  );

  // Calcula a média e as situações
  let m = a1.gerarMedia();
  a1.gerarEstado(m);
  a1.gerarEstadoFrequencia();

  // Salva o aluno
  turma.push(a1);

  alert('Aluno cadastrado com sucesso!');

  // Limpa os campos
  document.getElementById('nome').value = '';
  document.getElementById('matricula').value = '';
  document.getElementById('frequencia').value = '';
  document.getElementById('n1').value = '';
  document.getElementById('n2').value = '';
  document.getElementById('n3').value = '';

  document.getElementById('nome').focus();
}
