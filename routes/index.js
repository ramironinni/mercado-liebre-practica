const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index-controller");
const authenticate = require("../middlewares/auth/authenticate");

router.get("/", authenticate, indexController.show);
router.get("/pruebaSession", indexController.pruebaSession);

module.exports = router;
