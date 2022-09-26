const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const { usuarios } = require('../database/usuarios');//database usuario

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






module.exports ={

    checkRole
 
}