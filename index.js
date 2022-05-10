const express = require('express');
const server = express();

server.use(express.json());

const cursos = [];

// Retorna um curso
server.get('/cursos/:index', (req, res) => {
    const { index } = req.params;
    
    if(!cursos[index]) {
        return res.status(404).json({ success: false, response: "O curso solicitado não existe" });
    }

    return res.json({ curso: cursos[index] });
});

// Retorna todos os cursos
server.get('/cursos', (req, res) => {
    return res.json({ success: true, cursos: cursos });
});

// Cria um novo curso
server.post('/cursos', (req, res) => {
    const { name } = req.body;

    if(cursos.includes(name)) {
        return res.status(400).json({ success: false, response: "Curso já existente" });
    }

    cursos.push(name);
    return res.status(201).json({ success: true, response: "Curso cadastrado com sucesso" });
});

// Atualiza um curso
server.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;
    return res.json(cursos);
});

// deleta um curso
server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);

    return res.status(200).json( { success: true, response: "O curso foi deletado com sucesso!"} );
});


server.listen('8080');