const {Router} = require("express");
const router = Router();

const {getUsuarios,getUsuariosPorNombre,getUsuariosporNombreyContraseña} = require("../controller/usuarioControllers");

//MUESTRA LOS USUARIOS DESDE EL LADO DEL SERVIDOR http://localhost:4000/usuarios
router.get('/usuarios', getUsuarios);

//FILTRA LOS USUARIOS POR NOMBRE http://localhost:4000/usuarios/2
router.get('/usuarios/:nombre_usuario', getUsuariosPorNombre);


//FILTRA LOS USUARIOS POR NOMBRE Y CONTRASEÑA http://localhost:4000/usuarios/facundo/1234
router.get('/usuarios/:nombre_usuario/:password', getUsuariosporNombreyContraseña);

module.exports = router;