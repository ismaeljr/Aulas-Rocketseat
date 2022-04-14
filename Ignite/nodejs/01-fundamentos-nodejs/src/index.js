const { response } = require('express');
const { query } = require('express');
const { application } = require('express');
const express = require('express');

const app = express();


// GET - Buscar uma informação dentro do servidor
// Query Params => Paginação / Filtro
app.get("/courses", (request, response) => {
    const query = request.query;
    console.log(query);
    return response.json({ message: ["Curso1", "Curso 2", "Curso 3"]})
})

// POST - Inserir uma informação no servidor
app.post("/courses", (request, response) => {
    const body = request.body;
    console.log(body);
    return response.json({ message: ["Curso1", "Curso 2", "Curso 3", "Curso 4"]})
})

// PUT - ALterar uma informação no servidor
// Route Params =>  Identificador de um recurso para editar/deletar/buscar
app.put("/courses/:id", (request, response) => {
    const params = request.params;
    console.log(params);
    return response.json({ message: ["Curso6", "Curso 2", "Curso 3","Curso 4"]})
})

// PATCH - Alterar uma informação no servidor
// Route Params =>  Identificador de um recurso para editar/deletar/buscar
app.patch("/courses/:id", (request, response) => {
    const params = request.params;
    console.log(params);
    return response.json({ message: [ "Curso 2", "Curso 3","Curso 4"]})
})

// DELETE - Deletar uma informação no servidor
// Route Params =>  Identificador de um recurso para editar/deletar/buscar
app.delete("/courses/id", (request, response) => {
    const params = request.params;
    console.log(params);
    return response.json({ message: ["Curso 2", "Curso 3","Curso 4"]})
})

app.listen(3333, () => {
    console.log('Backend start!');
});

