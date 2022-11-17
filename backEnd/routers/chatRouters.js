const {Router} = require("express");
const router = Router();

const {getChats,getChatsPorIdCabecera} = require("../controller/chatControllers");

//-----------------------

const {checkRole} = require("../middleware/roleAuth");
//,checkRole(["usuario"])

//-----------------------

//INGRESA A LA VENTANA CHAT ==> ESTA VENTANA EN EL FRONT TENEMOS QUE ELIMINAR (CONSULTAR ANTES DE GENERAR CAMBIO)
router.get('/chat', getChats);

//,checkRoleAuth(["usuario"])


router.get('/chat/:idcabecera', getChatsPorIdCabecera);

module.exports = router;HeaderWebDim.html