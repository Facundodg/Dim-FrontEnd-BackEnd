const express = require('express');
const app = express();

const {datos} = require('./database/chat.js');
const {solicitudes} = require('./database/solicitud_persona.js');
const {usuarios} = require('./database/usuarios.js');



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

//

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

app.get('/usuarios', (req, res) => {

    debugger;

    res.send(JSON.stringify(usuarios));
    console.log(usuarios);

});

app.get('/usuarios/:nombre_usuario', (req, res) => {
    const nombre = req.params.nombre_usuario;
    const resultados = usuarios.usuario.filter(dato => dato.nombre_usuario == nombre);
    
    if (resultados.length === 0) {
      return res.status(204).send(`No se encontraron usuario de ${nombre_usuario}`);
    }
    res.json(resultados);

});

  
app.get('/usuarios/:nombre_usuario/:password', (req, res) => {

    const usuario = req.params.nombre_usuario;
    const contraseña = req.params.password;

    const resultados = usuarios.usuario.filter(dato => dato.password == contraseña 
        && dato.nombre_usuario === usuario);
    
    if (resultados.length === 0) {
      return res.status(204).send(`No se encontro usuario...`);
    }
    res.json(resultados);

});

  
app.get('/atencion-online/usuario/:cuit', (req, res) => {

    const cuit = req.params.cuit;
  
    const resultados = solicitudes.usuarios.filter(dato => dato.cuit == cuit);
    
    if (resultados.length === 0) {
      return res.status(204).send(`No se encontro usuario...`);
    }
    
    res.json(resultados);
    
});

app.get('/solicitud/:id_solicitud', (req, res) => {

    const idSolicitud = req.params.id_solicitud;
  
    const resultados = solicitudes.usuarios.filter(dato => dato.id_solicitud == idSolicitud);
    
    if (resultados.length === 0) {
      return res.status(204).send(`No se encontro usuario...`);
    }
    
    res.json(resultados);
    
});


const PUERTO = process.env.PORT || 4000;

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});

