const {Router} = require("express");
const router = Router();

const {getSolicitudes,getSolicitudPorCuit,getUsuarioPorId} = require("../controller/solicitudPersonaControllers");

//GET QUE SE ENCARGA DE MOSTRAR LAS FILAS DE LA TABLA
router.get('/atencion-online', getSolicitudes);

//FUNCION PARA FILTRAR EN LA TABLA DE SOLICITUDES
router.get('/atencion-online/consultas/:cuit/:tipoTributo/:tipoSolcitud', getSolicitudPorCuit);

//FILTRA LOS USUARIOS POR CUIT http://localhost:4000/usuarios/23122132322
router.get('/atencion-online/usuario/:id',getUsuarioPorId);

module.exports = router;