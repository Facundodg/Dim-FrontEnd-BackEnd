const express = require('express');
const app = express();

const { datos } = require('./database/chat.js');
const { solicitudes } = require('./database/solicitud_persona.js');
const { usuarios } = require('./database/usuarios.js');
const { infoSolicitud } = require('./database/infoSolicitud.js');

const jwt = require("jsonwebtoken");
const keys = require("./settings/keys");

app.set('key', keys.key);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//PRUEBA DE LOGIN PARA PROBAR EL TOKEN POR THUNDER CLIENT

/*

  const request = await fetch('api/usuarios', {
    method: 'POST',
    headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  });
  
*/

app.post("/login", (req, res) => {

    console.log(req.body);

    if (req.body.usuario == "admin" && req.body.password == "1234") {

        const payload = {
            ckeck: true
        }
        const token = jwt.sign(payload, app.get("key"), {
            expiresIn: "2d"
        });
        res.json({

            message: "AUTENTICADO CON EXITO",
            token: token

        })
    } else {

        res.json({

            message: "TOKEN NO CORRECTO"

        })

    }

})

//PRUEBA DE INICIO SESION CON TOKEN

const verificacion = express.Router();

verificacion.use((req, res, next) => {

    let token = req.headers["x-access-token"] || req.header["authorization"];
    console.log(token);

    if (!token) {
        res.status(401).send({
            error: ' Es necesario un token de autenticación'
        })
        return
    }
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
        console.log(token);
    }
    if (token) {

        jwt.verify(token, app.get("key"), (error, decoded) => {

            if (error) {

                return res.json({

                    message: "El token no es valido"

                });

            } else {

                req.decoded = decoded;
                next();

            }

        })

    }

});

app.get("/info", verificacion, (req, res) => {
    res.json("INFORMACION ENTREGADA");
})


//EXPRESA EL ARRANQUE DE EL SERVIDOR

app.get('/', (req, res) => {

    res.send('servidor escuchando💻....');

});


//INGRESA A LA VENTANA CHAT ==> ESTA VENTANA EN EL FRONT TENEMOS QUE ELIMINAR (CONSULTAR ANTES DE GENERAR CAMBIO)

app.get('/chat', (req, res) => {

    res.send(JSON.stringify(datos));
    console.log(datos);

});


//creacion de un login de prueba que crea el token

app.get('/chat/:idcabecera', (req, res) => {

    const idCabezera = req.params.idcabecera;

    const resultados = datos.chat.filter(dato => dato.idcabecera == idCabezera);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontro usuario...`);
    }

    res.json(resultados);

});


//GET QUE SE ENCARGA DE MOSTRAR LAS FILAS DE LA TABLA

app.get('/atencion-online', (req, res) => {

    res.send(JSON.stringify(solicitudes));
    console.log(solicitudes);

});

//MUESTRA LOS USUARIOS DESDE EL LADO DEL SERVIDOR http://localhost:4000/usuarios

app.get('/usuarios', (req, res) => {

    res.send(JSON.stringify(usuarios));
    console.log(usuarios);

});

//FILTRA LOS USUARIOS POR NOMBRE http://localhost:4000/usuarios/2

app.get('/usuarios/:nombre_usuario', (req, res) => {
    const nombre = req.params.nombre_usuario;
    const resultados = usuarios.usuario.filter(dato => dato.nombre_usuario == nombre);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontraron usuario de ${nombre_usuario}`);
    }
    res.json(resultados);

});














//FILTRA LOS USUARIOS POR NOMBRE Y CONTRASEÑA http://localhost:4000/usuarios/facundo/1234

app.get('/usuarios/:nombre_usuario/:password', (req, res) => {

    const usuario = req.params.nombre_usuario;
    const contraseña = req.params.password;

    const resultados = usuarios.usuario.filter(dato => dato.password == contraseña
        && dato.nombre_usuario === usuario);

    if (resultados.length === 0) {

        return res.status(204).send(`No se encontro usuario...`);

    }

        /*

        // Dominio que tengan acceso (ej. 'http://example.com')
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000/atencion-online');

        // Metodos de solicitud que deseas permitir
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

        // Encabecedados que permites (ej. 'X-Requested-With,content-type')
        res.setHeader('Access-Control-Allow-Headers', '*');


        */

        console.log(resultados);
        res.json(resultados);

        /*
        res.json({

            message: "AUTENTICADO CON EXITO",
            token: token

        })
        */


});
















//FILTRA LOS USUARIOS POR CUIT http://localhost:4000/usuarios/23122132322

app.get('/atencion-online/usuario/:cuit', (req, res) => {

    const cuit = req.params.cuit;

    const resultados = solicitudes.usuarios.filter(dato => dato.cuit == cuit);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontro usuario...`);
    }

    res.json(resultados);

});

//FILTRA LOS USUARIOS POR id_solicitud http://localhost:4000/solicitud/28511

app.get('/solicitud/:num_tramite', (req, res) => {

    const idSolicitud = req.params.num_tramite;

    const resultados = infoSolicitud.solicitud.filter(dato => dato.num_tramite == idSolicitud);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontro usuario...`);
    }

    res.json(resultados);

});

const PUERTO = process.env.PORT || 4000;

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});

