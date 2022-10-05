const { solicitudes } = require('../database/solicitud_persona');//database solicitud persona

const getSolicitudes = (req, res) => {

    res.send(JSON.stringify(solicitudes));
    console.log(solicitudes);

}

const getSolicitudPorCuit = (req, res) => {

    const cuit = req.params.cuit;
    let tributo = req.params.tipoTributo;
    const solicitud = req.params.tipoSolcitud;
    let tributofiltrar = "";

    console.log(tributo);

    switch (tributo) {

        case "0":
            tributofiltrar = "CISCA"
            break;
        case "1":
            tributofiltrar = "CISI"
            break;
        case "2":
            tributofiltrar = "PYP"
            break;
        case "3":
            tributofiltrar = "TEM"
            break;
        case "4":
            tributofiltrar = "TODO"
            break;
    }

    console.log(cuit.length);

    if (cuit.length === 11) {

        if(tributofiltrar.length != 0){

            if(tributofiltrar === "TODO"){

                const resultados = solicitudes.usuarios.filter(dato => dato.cuit == cuit);

                if (resultados.length === 0) {
        
                    return res.status(204).send(`No se encontro el cuit...`);
        
                } else {
        
                    console.log("encontre el cuit");
                    console.log(cuit);
                    res.json(resultados);
        
                }

            }else{

                const resultados = solicitudes.usuarios.filter(dato => dato.cuit == cuit && dato.tipo_solicitud == tributofiltrar);

                if (resultados.length === 0) {
        
                    return res.status(204).send(`No se encontro el cuit...`);
        
                } else {
        
                    console.log("encontre el cuit");
                    console.log(cuit);
                    res.json(resultados);
        
                }

            }


        }else{

            const resultados = solicitudes.usuarios.filter(dato => dato.cuit == cuit);
    
            if (resultados.length === 0) {
    
                return res.status(204).send(`No se encontro el cuit...`);
    
            } else {
    
                console.log("encontre el cuit");
                console.log(cuit);
                res.json(resultados);
    
            }
    
        }


    }else if(cuit.length < 11 || cuit == "#" || cuit ==""){

        if(tributofiltrar.length != 0){

            if(tributofiltrar === "TODO"){

                const resultados = solicitudes.usuarios.filter(dato => dato.tipo_solicitud);

                if (resultados.length === 0) {
        
                    return res.status(204).send(`No se encontro el cuit...`);
        
                } else {
        
                    console.log("encontre el cuit");
                    console.log(cuit);
                    res.json(resultados);
        
                }

            }else{

                const resultados = solicitudes.usuarios.filter(dato => dato.tipo_solicitud == tributofiltrar);

                if (resultados.length === 0) {
        
                    return res.status(204).send(`No se encontro el cuit...`);
        
                } else {
        
                    console.log("encontre el cuit");
                    console.log(cuit);
                    res.json(resultados);
        
                }

            }


        }else{

            console.log("Seleccione tipo de filtro");

        }
     
    }

}

const getUsuarioPorCuit = (req, res) => {

    const cuit = req.params.cuit;

    const resultados = solicitudes.usuarios.filter(dato => dato.cuit == cuit);

    if (resultados.length === 0) {
        return res.status(204).send(`No se encontro usuario...`);
    }

    res.json(resultados);

}

module.exports = {

    getSolicitudes,
    getSolicitudPorCuit,
    getUsuarioPorCuit

}