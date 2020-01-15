const express = require('express');
const consign = require('consign');
var app = express();

consign()
    .then('./config/middleware.js')
    .then('./config/bd.js')
    .then('./api')
    .then('./config')
    .into(app)

mysqlConnection.connect((err)=>{
    if(!err)
        console.log('Conexão bem sucedida');
    else
        console.log('A conexão com o BD falhou \n Error : '+ JSON.stringify(err, undefined, 2))
})

app.listen(3000, () => console.log('Server express está rodando na porta 3000'));