//Conexao com BD MySQL
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'celkeone',
    password: '123456',
    database: 'celke'
});

connection.connect(function(err){
    if (err) console.error('Erro ao realizar a conexão com BD: ' + err.stack); return;
});

connection.query("INSERT INTO users(nome, email) VALUES ('Jessica', 'jessica@celke.com.br')",function(err, result){
    if(!err){
        console.log('Usuario cadastrado com sucesso!');
    }else{
        console.log('Erro ao cadastra o usuario!');
    }
});