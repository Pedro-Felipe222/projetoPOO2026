
// ========================================
// NAVEGAÇÃO ENTRE AS TELAS PRINCIPAIS
// ========================================
let alunoSelecionado = null;

function trocarTela(tela) {
  document.querySelectorAll('#abas-principais .tab-button')
    .forEach(botao => botao.classList.remove('active'));

  document.querySelectorAll('#tela-cadastro-turma, #tela-listar-turmas, #tela-alunos')
    .forEach(elemento => elemento.classList.remove('active'));

  if (tela === 'cadastro') {
    document.getElementById('btn-nova-turma').classList.add('active');
    document.getElementById('tela-cadastro-turma').classList.add('active');
  }

  if (tela === 'turmas') {
  document.getElementById('btn-listar-turmas').classList.add('active');
  document.getElementById('tela-listar-turmas').classList.add('active');
  atualizarListaTurmas();
  }

  if (tela === 'alunos') {
    document.getElementById('tela-alunos').classList.add('active');
  }
}

function mostrarCadastroTurma() {
  trocarTela('cadastro');
}

function mostrarTurmas() {
  trocarTela('turmas');
}


// ========================================
// CADASTRO DE TURMAS
// ========================================

function salvarTurma() {
  const nome = document.getElementById('nome-turma').value.trim();
  const professor = document.getElementById('nome-professor').value.trim();
  const curso = document.getElementById('nome-curso').value.trim();

  if (nome === '' || professor === '' || curso === '') {
    alert('Preencha todos os campos!');
    return;
  }

  // Cria uma nova turma
  const novaTurma = new Turma(nome, professor, curso);

  // Adiciona ao array principal
  turmas.push(novaTurma);

  alert('Turma cadastrada com sucesso!');

  // Limpa os campos
  document.getElementById('nome-turma').value = '';
  document.getElementById('nome-professor').value = '';
  document.getElementById('nome-curso').value = '';

  // Abre a listagem de turmas
  mostrarTurmas();
}


// ========================================
// LISTAGEM DE TURMAS
// ========================================

function atualizarListaTurmas() {
  const lista = document.getElementById('lista-turmas');

  lista.innerHTML = '';

  if (turmas.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'Nenhuma turma cadastrada ainda.';
    lista.appendChild(item);
    return;
  }

  for (let i = 0; i < turmas.length; i++) {
    const turma = turmas[i];

    const item = document.createElement('li');

    const dados = document.createElement('div');

    const nome = document.createElement('strong');
    nome.textContent = turma.nome;

    const professor = document.createElement('p');
    professor.textContent = 'Professor: ' + turma.professor;

    const curso = document.createElement('p');
    curso.textContent = 'Curso: ' + turma.curso;

    const quantidade = document.createElement('p');
    quantidade.textContent = 'Alunos cadastrados: ' + turma.alunos.length;

    const botao = document.createElement('button');
    botao.textContent = 'Acessar turma';
    botao.classList.add('btn-detalhar');

    // Abre a turma correspondente
    botao.addEventListener('click', function () {
      abrirTurma(i);
    });

    dados.appendChild(nome);
    dados.appendChild(professor);
    dados.appendChild(curso);
    dados.appendChild(quantidade);

    item.appendChild(dados);
    item.appendChild(botao);

    lista.appendChild(item);
  }
}

function voltarTurmas() {
  fecharDetalhes();
  trocarTela('turmas');
}


// ========================================
// ABRIR UMA TURMA
// ========================================

function abrirTurma(indice) {
  turmaAtual = indice;

  const turma = turmas[turmaAtual];

  document.getElementById('titulo-turma').textContent =
    'Turma: '+turma.nome;

  document.getElementById('informacoes-turma').textContent =
    'Professor: ' + turma.professor +
    ' | Curso: ' + turma.curso;

  // Abre a tela dos alunos
  trocarTela('alunos');

  // Começa na tela de cadastro de alunos
  cadastrar();
}


// ========================================
// NAVEGAÇÃO ENTRE CADASTRO E LISTAGEM
// DE ALUNOS
// ========================================

function cadastrar() {
  document.getElementById('btn-cadastrar-aluno').classList.add('active');
  document.getElementById('btn-listar-alunos').classList.remove('active');

  document.getElementById('tab-cadastrar').classList.add('active');
  document.getElementById('tab-listar').classList.remove('active');
}

function listar() {
  document.getElementById('btn-listar-alunos').classList.add('active');
  document.getElementById('btn-cadastrar-aluno').classList.remove('active');

  document.getElementById('tab-listar').classList.add('active');
  document.getElementById('tab-cadastrar').classList.remove('active');

  atualizarListaAlunos();
}


// ========================================
// CADASTRO DE ALUNOS
// ========================================

function salvar() {

  if (turmaAtual === null) {
    alert('Selecione uma turma primeiro!');
    return;
  }

  let nome = document.getElementById('nome').value.trim();
  let matricula = document.getElementById('matricula').value.trim();
  let frequencia = document.getElementById('frequencia').value;
  let n1 = document.getElementById('n1').value;
  let n2 = document.getElementById('n2').value;
  let n3 = document.getElementById('n3').value;

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

  frequencia = Number(frequencia);
  n1 = Number(n1);
  n2 = Number(n2);
  n3 = Number(n3);

  if (
    !Number.isInteger(frequencia) ||
    frequencia < 0 ||
    frequencia > 20
  ) {
    alert('A frequência deve ser um número inteiro entre 0 e 20!');
    return;
  }

  if (
    [n1, n2, n3].some(
      nota => !Number.isFinite(nota) || nota < 0 || nota > 10
    )
  ) {
    alert('As notas devem estar entre 0 e 10!');
    return;
  }

  // Cria o aluno
  const aluno = new Aluno(
    nome,
    matricula,
    frequencia,
    n1,
    n2,
    n3
  );

  // Calcula média e situação
  const media = aluno.gerarMedia();

  aluno.gerarEstado(media);

  // Adiciona o aluno SOMENTE na turma selecionada
  turmas[turmaAtual].adicionarAluno(aluno);

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


// ========================================
// LISTAGEM DE ALUNOS
// ========================================

function atualizarListaAlunos() {
  const lista = document.getElementById('alunos');

  lista.innerHTML = '';

  const alunos = turmas[turmaAtual].getAlunos();

  if (alunos.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'Nenhum aluno cadastrado ainda.';
    lista.appendChild(item);
    return;
  }

  for (let i = 0; i < alunos.length; i++) {
    const aluno = alunos[i];

    const item = document.createElement('li');

    const dados = document.createElement('div');

    dados.textContent =
      'Nome: ' + aluno.getNome() +
      ' | Matrícula: ' + aluno.getMatricula() +
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


// ========================================
// DETALHES DO ALUNO
// ========================================

function detalharAluno(indice) {
  const aluno = turmas[turmaAtual].alunos[indice];

  // Guarda o índice do aluno que está sendo editado
  alunoSelecionado = indice;

  document.getElementById('modal-nome').textContent =
    'Aluno: ' + aluno.getNome() +
    ' | Matrícula: ' + aluno.getMatricula();

  // Preenche os campos com as notas atuais
  document.getElementById('modal-nota1').value =
    aluno.getNota1();

  document.getElementById('modal-nota2').value =
    aluno.getNota2();

  document.getElementById('modal-nota3').value =
    aluno.getNota3();

  document.getElementById('modal-media').textContent =
    'Média: ' + aluno.media.toFixed(2);

  const resultado = aluno.gerarEstadoFrequencia();

  document.getElementById('modal-frequencia').textContent =
    'Frequência: ' + aluno.getFrequencia() +
    '/20 aulas (' + resultado.percentual + '%)';

  document.getElementById('modal-situacao').textContent =
    'Situação: ' + aluno.estado;

  document.getElementById('modal-detalhes').classList.add('ativo');
}

function fecharDetalhes() {
  document.getElementById('modal-detalhes').classList.remove('ativo');
}


// ========================================
// INICIALIZAÇÃO
// ========================================

// A primeira tela exibida será o cadastro de turmas.
document.addEventListener('DOMContentLoaded', function () {
  mostrarCadastroTurma();
});



function salvarAlteracoes() {

  if (alunoSelecionado === null || turmaAtual === null) {
    return;
  }

  const aluno = turmas[turmaAtual].alunos[alunoSelecionado];

  const n1 = document.getElementById('modal-nota1').value;
  const n2 = document.getElementById('modal-nota2').value;
  const n3 = document.getElementById('modal-nota3').value;

  if (n1 === '' || n2 === '' || n3 === '') {
    alert('Preencha todas as notas!');
    return;
  }

  const notas = [Number(n1), Number(n2), Number(n3)];

  if (notas.some(nota =>
    !Number.isFinite(nota) || nota < 0 || nota > 10
  )) {
    alert('As notas devem estar entre 0 e 10!');
    return;
  }

  // Atualiza as notas
  aluno.setNota1(notas[0]);
  aluno.setNota2(notas[1]);
  aluno.setNota3(notas[2]);

  // Recalcula média e situação
  aluno.gerarMedia();
  aluno.gerarEstado(aluno.media);

  // Atualiza a média no modal
  document.getElementById('modal-media').textContent =
    'Média: ' + aluno.media.toFixed(2);

  // Atualiza a situação no modal
  document.getElementById('modal-situacao').textContent =
    'Situação: ' + aluno.estado;

  // Atualiza a listagem de alunos
  atualizarListaAlunos();

  alert('Notas atualizadas com sucesso!');
}