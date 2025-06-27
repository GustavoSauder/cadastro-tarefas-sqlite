const Tarefa = require('../models/tarefa');

// Criar nova tarefa
exports.criarTarefa = async (req, res) => {
  try {
    const { titulo, descricao, responsavel, status } = req.body;
    const tarefa = await Tarefa.create({ titulo, descricao, responsavel, status });
    res.status(201).json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar tarefa.' });
  }
};

// Listar todas as tarefas
exports.listarTarefas = async (req, res) => {
  try {
    const tarefas = await Tarefa.findAll();
    res.json(tarefas);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar tarefas.' });
  }
};

// Atualizar tarefa
exports.atualizarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { titulo, descricao, responsavel, status } = req.body;
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    await tarefa.update({ titulo, descricao, responsavel, status });
    res.json(tarefa);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar tarefa.' });
  }
};

// Deletar tarefa
exports.deletarTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const tarefa = await Tarefa.findByPk(id);
    if (!tarefa) return res.status(404).json({ error: 'Tarefa não encontrada.' });
    await tarefa.destroy();
    res.json({ message: 'Tarefa removida com sucesso.' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao deletar tarefa.' });
  }
};
