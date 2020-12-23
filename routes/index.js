const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index-controller");

router.get("/", indexController.show);
router.get("/pruebaSession", indexController.pruebaSession);

module.exports = router;
