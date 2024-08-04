const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuração do MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // Seu usuário MySQL
    password: 'root', // Sua senha MySQL
    database: 'barbearia'
});

// Conectar ao banco de dados
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        process.exit(1);
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Criação da tabela se não existir
db.query(`
    CREATE TABLE IF NOT EXISTS atendimentos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255),
        telefone VARCHAR(20),
        horario DATETIME,
        servico VARCHAR(255),
        barbeiro VARCHAR(255),
        valor DECIMAL(10, 2)
    )
`);

// Rota para receber agendamento e salvar no banco
app.post('/api/agendamento', (req, res) => {
    const { nome, telefone, horario, servico, barbeiro, valor } = req.body;

    const query = 'INSERT INTO atendimentos (nome, telefone, horario, servico, barbeiro, valor) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, telefone, horario, servico, barbeiro, valor], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao salvar agendamento', error: err.message });
        }
        res.status(200).json({ message: 'Agendamento salvo com sucesso!', id: results.insertId });
    });
});

// Inicializa o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
