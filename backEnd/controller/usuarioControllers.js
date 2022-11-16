const { usuarios } = require('../database/usuarios.js');//database usuario

const getUsuarios = (req, res) => {

    res.send(JSON.stringify(usuarios));
    console.log(usuarios);

}


const getUsuariosPorNombre = (req, res) => {
    const nombre = req.params.nombre_usuario;
    const resultados = usuarios.usuario.filter(dato => dato.nombre_usuario == nombre);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontraron usuario de ${nombre_usuario}`);
    }
    res.json(resultados);

}

const getUsuariosporNombreyContraseña = (req, res) => {

    const usuario = req.params.nombre_usuario;
    const contraseña = req.params.password;

    const resultados = usuarios.usuario.filter(dato => dato.password == contraseña
        && dato.nombre_usuario === usuario);

    if (resultados.length === 0) {

        return res.status(204).send(`No se encontro usuario...`);

    }


    console.log(resultados);
    res.json(resultados);

}

module.exports ={

    getUsuarios,
    getUsuariosPorNombre,
    getUsuariosporNombreyContraseña

}