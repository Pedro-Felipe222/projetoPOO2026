// Exibe a lista de alunos
function listar() {
  const btnCadastrar = document.getElementById('btn-cadastrar');
  const tabCadastrar = document.getElementById('tab-cadastrar');
  const btnListar = document.getElementById('btn-listar');
  const tabListar = document.getElementById('tab-listar');

  // Troca a aba ativa
  btnListar.classList.add('active');
  btnCadastrar.classList.remove('active');

  tabListar.classList.add('active');
  tabCadastrar.classList.remove('active');

  const lista = document.getElementById('alunos');

  // Limpa a lista anterior
  lista.innerHTML = '';

  // Verifica se há alunos cadastrados
  if (turma.length === 0) {
    const item = document.createElement('li');
    item.textContent = 'Nenhum aluno cadastrado ainda.';
    lista.appendChild(item);
    return;
  }

  // Percorre a turma e exibe os dados
  for (let i = 0; i < turma.length; i++) {
    const aluno = turma[i];
    const item = document.createElement('li');

    item.textContent =
      'Nome: ' +
      aluno.nome +
      ' | Matrícula: ' +
      aluno.matricula +
      ' | Média: ' +
      aluno.media.toFixed(1) +
      ' | Situação: ' +
      aluno.estado;

    lista.appendChild(item);
  }
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
