const express = require('express');
const app = express();

const {datos} = require('./chat.js');


app.get('/', (req, res) => {

    res.send('servidor escuchando💻....');

});


app.get('/chat', (req, res) => {

    res.send(JSON.stringify(datos));
    console.log("entre");
    console.log(datos);
});

/**/

const PUERTO = process.env.PORT || 4000;

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});

