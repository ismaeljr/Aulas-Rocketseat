const { request } = require('express');
const { response } = require('express');
const express = require('express');
// const {uuid} = require('uuidv4'); <- forma depreciada de declarar uuid

//forma correta de declarar uuid
const {v4: uuidv4} = require('uuid');

const app = express();

app.listen(3333, () => {
    console.log('Servidor ligado!');
});

// ativa JSON
app.use(express.json());

const customers = [];


//metodo para criação de conta
app.post('/account',(request, response) => {
    const {cpf, name} = request.body;

    //validação para cadastrarmos apenas 1 cpf
    const cpfValidation = customers.some((customer) => customer.cpf === cpf);

    if(cpfValidation){
        return response.status(400).json({error: "Cpf Already Exists!!!"})
    }

    const customer = {
        id: uuidv4(),
        cpf,
        name,
        statement: [],
    }

    customers.push(customer);

    return response.status(201).json(customer);
})

//metodo para retornar o saldo em conta
app.get('/statement/:cpf',(request,response) => {
    const {cpf} = request.params;

    const statementValue = customers.find((customer) => customer.cpf === cpf);

    //caso não tenha retorno possitivo mandamos a msg 400
    if(!statementValue){
        return response.status(400).json({error: "CPF is not found!"})
    }

    //o retorno do json ja leva o status correto
    return response.json(statementValue.statement);

})