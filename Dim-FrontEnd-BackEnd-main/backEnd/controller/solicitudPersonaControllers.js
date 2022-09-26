const { solicitudes } = require('../database/solicitud_persona');//database solicitud persona

const getSolicitudes = (req, res) => {

    res.send(JSON.stringify(solicitudes));
    console.log(solicitudes);

}

const getSolicitudPorCuit = (req, res) => {

    const cuit = req.params.cuit;
    
    if (cuit.length === 11) {

        const resultados = solicitudes.usuarios.filter(dato => dato.cuit == cuit);

        if (resultados.length === 0) {

            return res.status(204).send(`No se encontro el cuit...`);

        } else {

            console.log("encontre el cuit");
            console.log(cuit);
            res.json(resultados);

        }

    } else {

        console.log("el cuit no tiene la cantidad de caracteres correcta");

    }

}

const getUsuarioPorCuit =(req, res) => {

    const cuit = req.params.cuit;

    const resultados = solicitudes.usuarios.filter(dato => dato.cuit == cuit);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontro usuario...`);
    }

    res.json(resultados);

}

module.exports ={

    getSolicitudes,
    getSolicitudPorCuit,
    getUsuarioPorCuit

}