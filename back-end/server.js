const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./database/db');
const tarefaRoutes = require('./routes/tarefaRoutes');

app.use(cors());
app.use(express.json());
app.use('/api', tarefaRoutes);

// Sincronizar banco e iniciar servidor
sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
  });
});
