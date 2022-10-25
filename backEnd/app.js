const express = require('express'); //importo express
const app = express(); // instancio un objeto de tipo express
const cors = require("cors"); // le doy los permisos a cors asai no me produsca proble para interactuar dos servidores locales

//---------------zona prueba-----------------------
app.use(require("./routers/infoSolicitudRouters"));
app.use(require("./routers/chatRouters"));
app.use(require("./routers/solicitudPersonaRouters"));
app.use(require("./routers/usuariosRouters"));

app.use(cors({

    origin:"http://localhost:4001"

})); //activa cors para no producir problema con los servidores locales
// app.use(require("./routers/tokenRouter"));
//-------------------------------------------------

const { Server } = require("socket.io");
const http = require("http");

const server = http.createServer(app);
const io = new Server(server,{

    cors:"http://localhost:4000"

});

conexions = 0;

server.listen(4001, () => {

})

//-------------------------------------------------

const { usuarios } = require('./database/usuarios');//database usuario
const { consultas } = require('./database/consultas');//database usuario
const { datos } = require("./database/chat")
const { solicitudes } = require('./database/solicitud_persona'); //database infoSolicitud
const { infoSolicitud } = require('./database/infoSolicitud'); //database infoSolicitudParaModal

//-------------------------------------------------

const jwt = require("jsonwebtoken"); //importo el modulo de token o jwt
const { get } = require('./routers/infoSolicitudRouters');

//middlewares
app.use(express.urlencoded({ extended: false }));//procesa los datos traidos de un formulario y los convierte en objetos 
app.use(express.json()); //convertira los objetos en formato json a objetos javaScript


//-------------------------SOCKET---------------------------



io.on("connection", (socket) => {

    console.log("Usuario conectado al socket");

    // socket.on("chat", (msg)=>{

    //     console.log("mensaje:" + msg);

    // })

    socket.on("chat", (msg) => {

        // console.log("mensaje:" + msg);
        io.emit("chat", msg);

    })

    socket.on("mensaje", (msg) => {

        // console.log("mensaje:" + msg);
        io.emit("mensaje", msg);

    })

    
    socket.on("refresqueEstados", (msg) => {

        io.emit("refresqueEstados", msg);

    })

    // refresqueEstados

    conexions++;

    console.log(conexions);

    socket.on("disconnect", ()=>{

        conexions--;
        console.log(conexions);

    })

})

//--------------------------TOKEN---------------------------

//GENERA EL TOKEN 
app.post("/login", (req, res) => {

    const user = req.body.user;

    const usuario = req.body.user.name;
    const contraseña = req.body.user.password;

    console.log(usuario);
    console.log(contraseña);
    console.log(user);

    //guardado ahora mismo en una cookie NO en un localstorage

    const resultados = usuarios.usuario.filter(dato => dato.password == contraseña
        && dato.nombre_usuario === usuario);

    if (resultados.length === 0) {

        return res.status(204).send(`No se encontro usuario...`);

    }

    console.log(resultados[0]);

    const token = jwt.sign(resultados[0], "keykey", { expiresIn: "1h" });
    res.status(200).json({ token });

});

//---------------METODOS POST PARA AGERGAR EN LOS ROUTERS LUEGO--------------------------

app.post('/agregarMensaje', (req, res) => {

    let mensaje = req.body;
    datos.chat.push(mensaje);
    console.log("-----Mensaje------")
    res.json(datos);
    console.log("------------------")

});

app.post('/agregarInfoSolicitud', (req, res) => {

    let InfoSolicitudCuerpo = req.body;
    solicitudes.usuarios.push(InfoSolicitudCuerpo);
    res.json(solicitudes);
    console.log(solicitudes);

});

app.post('/agregarInfoSolicitudParaModal', (req, res) => {

    let InfoSolicitudCuerpoParaModal = req.body;
    infoSolicitud.solicitud.push(InfoSolicitudCuerpoParaModal);
    res.json(infoSolicitud);
    console.log(infoSolicitud);

});

app.post('/agregarConsulta', (req, res) => {

    let InfoConsulta= req.body;
    consultas.consulta.push(InfoConsulta);
    res.json(consultas);
    console.log(consultas);

});

app.post('/registrar', (req, res) => {

    console.log("entoy entrando turro")

    let InfoConsulta = req.body;
    usuarios.usuario.push(InfoConsulta);
    res.json(usuarios);
    console.log(consultas);

})


app.put('/modificarInfoSolicitud/:id_solicitud', (req, res) => {
    const solicitudActualizado = req.body;
    const id = req.params.id_solicitud;
  
    const indice = solicitudes.usuarios.findIndex(usuarios => usuarios.id_solicitud == id);
    console.log("indice:" + indice);
  
    if (indice >= 0) {
        solicitudes.usuarios[indice] = solicitudActualizado;
    }
    
    res.json(solicitudes);
  });

//agregarConsulta


/*

//VERIFICA EL TOKEN (NO LO ESTOY USANDO)
app.post("/pruebaToken", (req, res) => {

    const token = req.headers["authorization"]

    jwt.verify(token, "keykey", (err, user) => {

        if (err) {

            res.status(403).json({ msg: "NO AUTORIZADO" });

        } else {

            res.status(200).json({ msg: "AUTORIZADO", user });
            console.log("resultado abajo");
            //return jwt.verify(token, "keykey");
            const rol = jwt.verify(token, "keykey");
            verificaRol(rol);
            console.log("------------------------------");

        }

    });

});

*/

//VERIFICA EL TOKEN SI ES USUARIO (EN USO)
app.post("/pruebaTokenInternOusuario", (req, res) => {

    const token = req.headers["authorization"]

    jwt.verify(token, "keykey", (err, user) => {

        if (err) {

            res.status(403).json({ msg: "NO AUTORIZADO" });

        } else {

            const rol = jwt.verify(token, "keykey");

            if (rol.rol === "interno") {

                res.status(200).json({ msg: "INTERNO", user });

            } else if (rol.rol === "usuario") {

                res.status(200).json({ msg: "USUARIO", user });

            } else {

                res.status(403).json({ msg: "ROLO NO REGISTRADO" });

            }


        }

    });

});

app.get("/consultas/:usuario", (req, res) => {

    const usuario = req.params.usuario;

    const resultados = consultas.consulta.filter(dato => dato.usuario == usuario);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontro usuario...`);
    }

    res.json(resultados);

});

//----------------------------------------------------------




//----------------------------------------------------------
/*

const checkRole = (roles) => async (req, res, next) => {

    try {

        const token = req.headers["authorization"];

        console.log(token);

        console.log(await verifyToken(token));

        const tokenData = await verifyToken(token);

        console.log(tokenData);

        const resultados = usuarios.usuario.filter(dato => dato.id === tokenData.id);

        console.log(resultados);

        if (resultados.length === 0) {

            return res.status(204).send(`No se encontro usuario por id...`);

        }

        if ([].concat(roles).includes(tokenData.rol)) {

            next()

        } else {

            res.status(409);
            res.send({ error: "No tenes Permisos..." })

        }

    } catch (error) {

        console.log(error);

    }

}

*/

//----------------ARRANQUE DEL SERVIDOR--------------------

//EXPRESA EL ARRANQUE DE EL SERVIDOR
app.get('/', (req, res) => {

    res.send('servidor escuchando💻....');

});

const PUERTO = process.env.PORT || 4000;

app.listen(PUERTO, () => {
    console.log(`El servidor esta escuchando en el puerto ${PUERTO}...`);
});

//--------------------------------------------------------------------