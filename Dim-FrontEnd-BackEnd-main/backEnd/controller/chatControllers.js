const { datos } = require('../database/chat'); //database chat

const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'root',
    database: 'pruebas',
    port: '5432'
});

const getChats = async (req, res) => {

    res.send(JSON.stringify(datos));
    console.log(datos);

    // const respuesta = await pool.query('SELECT * FROM chat');
    // console.log(respuesta.rows);
    // res.send(JSON.stringify(respuesta.rows));
    //res.json(respuesta.rows);

}

const getChatsPorIdCabecera = (req, res) => {

    const idCabezera = req.params.idcabecera;

    const resultados = datos.chat.filter(dato => dato.idcabecera == idCabezera);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontro usuario...`);
    }

    res.json(resultados);

}

module.exports ={

    getChats,
    getChatsPorIdCabecera

}