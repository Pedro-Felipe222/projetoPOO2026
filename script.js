// Exibe a lista de alunos

function listar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  btnListar.classList.add('active');
  btnCadastrar.classList.remove('active');

  tabListar.classList.add('active');
  tabCadastrar.classList.remove('active');

  const lista = document.getElementById('alunos');
  lista.innerHTML = '';

  if (turma.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'Nenhum aluno cadastrado ainda.';
    lista.appendChild(item);
    return;
  }

  for (let i = 0; i < turma.length; i++) {
    const aluno = turma[i];
    const item = document.createElement('li');

    const dados = document.createElement('div');
    dados.textContent =
      'Nome: ' + aluno.nome +
      ' | Matrícula: ' + aluno.matricula +
      ' | Média: ' + aluno.media.toFixed(2) +
      ' | Situação: ' + aluno.estado;

    const botao = document.createElement('button');
    botao.textContent = 'Detalhar';
    botao.classList.add('btn-detalhar');

    botao.addEventListener('click', function () {
      detalharAluno(i);
    });

    item.appendChild(dados);
    item.appendChild(botao);
    lista.appendChild(item);
  }
}

// Exibe as notas do aluno em um pop-up

function detalharAluno(indice) {
  const aluno = turma[indice];

  document.getElementById('modal-nome').innerHTML =
    `Aluno: ${aluno.nome}<br>Matrícula: ${aluno.matricula}`;

  document.getElementById('modal-nota1').textContent =
    'Nota 1:  ' + aluno.nota1;

  document.getElementById('modal-nota2').textContent =
    'Nota 2:  ' + aluno.nota2;

  document.getElementById('modal-nota3').textContent =
    'Nota 3:  ' + aluno.nota3;
  
    const resultado = aluno.gerarEstadoFrequencia();

  document.getElementById('modal-frequencia').textContent =
    'Frequência: ' + aluno.frequencia +
    '/20 aulas (' + resultado.percentual + '%)';

  // Exibe a situação da frequência
  document.getElementById('modal-ranking').textContent =
    'Ranking: '
  /*
    resultado.estFrequencia
      ? 'Frequência: Atingiu o mínimo de 70%'
      : 'Frequência: Abaixo do mínimo de 70%'; */

  document.getElementById('modal-detalhes').classList.add('ativo');
}

function fecharDetalhes() {
  document.getElementById('modal-detalhes').classList.remove('ativo');
}



// Volta para a aba de cadastro
function cadastrar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  btnCadastrar.classList.add('active');
  btnListar.classList.remove('active');

  tabCadastrar.classList.add('active');
  tabListar.classList.remove('active');
}
