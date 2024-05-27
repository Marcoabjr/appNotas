const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI,  {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch(err => {
  console.error('Falha na Conexão  MongoDB', err);
});

app.use('/api/notes', require('./routes/notes'));

app.listen(PORT, () => {
  console.log(`Rodando na Porta ${PORT}`);
});