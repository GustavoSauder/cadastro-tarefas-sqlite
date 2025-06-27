const API_URL = 'http://localhost:3001/api/tarefas';
let tarefas = [];

document.getElementById("tarefa-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const titulo = document.getElementById("titulo").value;
  const descricao = document.getElementById("descricao").value;
  const responsavel = document.getElementById("responsavel").value;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titulo, descricao, responsavel })
    });
    if (!response.ok) throw new Error('Erro ao cadastrar tarefa');
    await carregarTarefas();
    e.target.reset();
  } catch (erro) {
    alert(erro.message);
  }
});

async function carregarTarefas() {
  const response = await fetch(API_URL);
  tarefas = await response.json();
  atualizarTabela();
}

function atualizarTabela() {
  const tbody = document.querySelector("#tabela-tarefas tbody");
  tbody.innerHTML = "";

  tarefas.forEach((tarefa, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tarefa.titulo}</td>
      <td>${tarefa.responsavel}</td>
      <td>${tarefa.status}</td>
      <td>
        <button onclick="alterarStatus(${tarefa.id})">Alterar Status</button>
        <button onclick="removerTarefa(${tarefa.id})">Remover</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  atualizarResumo();
}

async function alterarStatus(id) {
  const tarefa = tarefas.find(t => t.id === id);
  if (!tarefa) return;
  const estados = ["Pendente", "Em Andamento", "Concluída"];
  const idx = estados.indexOf(tarefa.status);
  const novoStatus = estados[(idx + 1) % estados.length];
  await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...tarefa, status: novoStatus })
  });
  await carregarTarefas();
}

async function removerTarefa(id) {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  await carregarTarefas();
}

function atualizarResumo() {
  const contagem = { "Pendente": 0, "Em Andamento": 0, "Concluída": 0 };
  tarefas.forEach(t => contagem[t.status]++);
  document.getElementById("resumo-status").textContent =
    `Pendente: ${contagem["Pendente"]} | Em Andamento: ${contagem["Em Andamento"]} | Concluída: ${contagem["Concluída"]}`;
}

// Carregar tarefas ao abrir a página
carregarTarefas();

// Tornar funções globais para uso nos botões inline
window.alterarStatus = alterarStatus;
window.removerTarefa = removerTarefa;
