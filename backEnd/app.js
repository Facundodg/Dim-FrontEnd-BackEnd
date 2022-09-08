const express = require('express');
const app = express();

const {datos} = require('./database/chat.js');
const {solicitudes} = require('./database/solicitud_persona.js');


/*

//2 - seteamos urlencoded para capturar los datos del formulario
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3 - Invocamos a dotenv
const dotenv = require("dotenv");
dotenv.config({path:"./env/.env"});

//5 - Establecer un motor de plantillas 
app.set("view engine", "ejs");

//6 - Invocar o bcryptjs
const bcryptjs = require("bcryptjs");

app.post("/inicio-sesion", async(req,res) =>{

    console.log("holaaa");

});

app.post("/auth", async(req, res) => {

    const user = req.body.user;
    const password = req.body.password;

    console.log("usuario: " + user);
    console.log("password: " + password);

});

*/

app.get('/', (req, res) => {

    res.send('servidor escuchando💻....');

});


app.get('/chat', (req, res) => {

    res.send(JSON.stringify(datos));
    console.log(datos);

});

app.get('/atencion-online', (req, res) => {

    res.send(JSON.stringify(solicitudes));
    console.log(solicitudes);

});


const PUERTO = process.env.PORT || 4000;

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});

