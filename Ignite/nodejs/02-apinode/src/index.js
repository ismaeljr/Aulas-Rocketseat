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


//não devemos realizar saque com valor insuficiente, para isso criaremos a função balance
function getBalance(statement) {

    // a função reduce calcula os valores de acordo com o tipo de operação
    const balance = statement.reduce((acc,operation) => {
        if(operation.type === 'credit'){
            return acc + operation.amount;
        }else{
            return acc - operation.amount;
        }
    },0)

    return balance;
}


//middleware que irá realizar a validação se a conta é existente
function cpfAccountValidation (request, response, next) {
    const {cpf} = request.headers;

    const customer = customers.find((customer) => customer.cpf === cpf);

    //caso não tenha retorno possitivo mandamos a msg 400
    if(!customer){
        return response.status(400).json({error: "CPF is not found!"})
    }

    //com o código acima exportamos o customer da função para os metodos que o estão recebendo
    request.customer = customer;

    //caso passe na validação da next para continuar os metodos
    return next();
    
}


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
app.get('/statement',cpfAccountValidation,(request,response) => {
    
    const { customer } = request
    //o retorno do json ja leva o status correto
    return response.json(customer.statement);

})

//metodo para criar um deposito em conta
app.post('/deposit',cpfAccountValidation,(request,response) => {
    
    const {description, amount} = request.body;

    const {customer} = request;

    //depositOperation irá alimentar o statment do nosso account
    const depositOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "credit"
    }

    //acrescentando o statement do account
    customer.statement.push(depositOperation);

    return response.status(201).json(customer);

})

//metodo para realizar saque na conta

app.post('/withdraw',cpfAccountValidation,(request,response) => {

    const {amount} = request.body;

    const {customer} = request;

    // resultado da subtração ou adição
    const balance = getBalance(customer.statement);

    //valida se resultado da operação é menor que o total da conta
    if(balance < amount){
        return response.status(400).json({error: "Balance not available for withdrawal"})
    }

    //debitOperation
    const debitOperation = {
        description: "saque",
        amount,
        created_at: new Date(),
        type: 'debit'
    }

    //adicionando saque na conta
    customer.statement.push(debitOperation);

    return response.status(201).json(customer);
})


//metodo para listar extrato por data "filtro"

app.get('/statement/date',cpfAccountValidation,(request,response) => {
    const {customer} = request;
    const {date} = request.query;

    // a concatenação com o 00:00 é uma marreta pra considerar todas as datas na mesma hora
    const dateFormat = new Date(date + "00:00");

    //utilizamos a função filter, para buscar dentro do statement a data e retornar aqueles encontrados
    const statementDate = customer.statement.filter((statement) => {
        statement.created_at.toDateString() === new Date(dateFormat).toDateString();
    });

    return response.json(statementDate);

})

//metodo para atualizar a conta de modo geral no nosso caso só nome

app.put('/account', cpfAccountValidation, (request, response) => {

    const {customer} = request;

    const { name } = request.body;

    customer.name = name;

    return response.status(201).json(customer);
})

//metodo para retornar todas informações de uma conta
app.get('/account',cpfAccountValidation,(request, response) => {
    const {customer} = request;

    return response.json(customer);
})


//remover uma conta

app.delete('/account', cpfAccountValidation, (request, response) => {
    const {customer} = request;

    //para deletar pegamos o vetor e utilizamos a função splice
    customers.splice(customer,1);

    return response.json(customers);
})

//metodo para retornar saldo da conta
app.get('/balance', cpfAccountValidation, (request, response) => {
    const {customer} = request;

    const balance = getBalance(customer.statement);

    return response.json(balance);
})