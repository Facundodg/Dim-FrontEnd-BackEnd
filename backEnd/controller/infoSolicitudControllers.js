const { infoSolicitud } = require('../database/infoSolicitud'); //database infoSolicitud

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'pruebas',
    port: '5432'
});

const getInfoSolicitud = async (req, res) => {

    const idSolicitud = req.params.num_tramite;


    const resultados = infoSolicitud.solicitud.filter(dato => dato.num_tramite == idSolicitud);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontro usuario...`);
    }

    res.json(resultados);


    /*

    const respuesta = await pool.query('SELECT * FROM infosolicitud WHERE num_tramite');
    console.log(respuesta.rows);
    res.json(respuesta.rows);

    */

}

module.exports = {

    getInfoSolicitud

}