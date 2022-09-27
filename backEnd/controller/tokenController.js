const { usuarios } = require('../database/usuarios');//database solicitud persona
const jwt = require("jsonwebtoken"); //importo el modulo de token o jwt


const getToken = (req, res) => {

    console.log(req.body);

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

}

module.exports ={

    getToken

}