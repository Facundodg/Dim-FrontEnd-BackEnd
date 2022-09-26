const express = require('express'); //importo express
const app = express(); // instancio un objeto de tipo express
const cors = require("cors"); // le doy los permisos a cors asai no me produsca proble para interactuar dos servidores locales

//---------------zona prueba-----------------------
app.use(require("./routers/infoSolicitudRouters"));
app.use(require("./routers/chatRouters"));
app.use(require("./routers/solicitudPersonaRouters"));
app.use(require("./routers/usuariosRouters"));
//-------------------------------------------------

//-------------------------------------------------

const { usuarios } = require('./database/usuarios');//database usuario


//-------------------------------------------------

const jwt = require("jsonwebtoken"); //importo el modulo de token o jwt

//middlewares
app.use(express.urlencoded({ extended: false }));//procesa los datos traidos de un formulario y los convierte en objetos 
app.use(express.json()); //convertira los objetos en formato json a objetos javaScript
app.use(cors()); //activa cors para no producir problema con los servidores locales

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

//VERIFICA EL TOKEN
app.post("/pruebaToken", (req, res) => {

    const token = req.headers["authorization"]

    console.log(token);

    jwt.verify(token, "keykey", (err, user) => {

        if (err) {

            res.status(403).json({ msg: "NO AUTORIZADO" });

        } else {

            res.status(200).json({ msg: "AUTORIZADO", user });

        }
    });

})

//---------------------------------------------------------

const checkRole = (roles) => async (req,res,next) =>{

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

        if([].concat(roles).includes(tokenData.rol)){

            next()

        }else{

            res.status(409);
            res.send({error:"No tenes Permisos..."})

        }

    } catch (error) {
        
        console.log(error);

    }

}

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