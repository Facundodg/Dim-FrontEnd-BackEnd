const {Router} = require("express");
const router = Router();

const {getToken} = require("../controller/tokenController");


router.post("/login", getToken);

module.exports = router;