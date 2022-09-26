const {Router} = require("express");
const router = Router();

const {getInfoSolicitud} = require("../controller/infoSolicitudControllers");

//FILTRA LOS USUARIOS POR id_solicitud http://localhost:4000/solicitud/28511
router.get('/solicitud/:num_tramite', getInfoSolicitud);

module.exports = router;