const express = require('express');
const app = express();
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

app.use(express.json());
app.use(cors());

const projects = [];

//middleware

function validateId(request, response,next){
    const {id} = request.params;

    //isUuid é uma função então têm que receber parametro
    if(!isUuid(id)){
        response.status(400).json({erro: "Invalid ID!"})
    }

    next();
}


//desta forma escrevemos JSON
app.get('/json',(request, response) => {
    
       
    return response.json(projects);
});

app.post('/json',(request, response) => {
    
    const {title , owner} = request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project);

    return response.json(project);


});

app.put('/json/:id',validateId,(request, response) => {
   
    const { id } = request.params;
    const { title , owner } = request.body;

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0 ){
        return response.status(400).json({erro: "Content not found!"});
    }

    const project = {
        id,
        title,
        owner
    }

    projects[projectIndex] = project;

    return response.json(project);

});

app.delete('/json/:id',validateId,(request, response) => {
    const { id } = request.params;
    const { title, owner } = request.body

    const projectIndex = projects.findIndex(project => project.id === id);

    if(projectIndex < 0){
        return response.status(400).json({erro: "Content not found!"});
    }

    projects.splice(projectIndex,1);

    return response.status(204).send();

});


app.listen(3333,() => {
    console.log("Servidor no ar! 🚀️")
});