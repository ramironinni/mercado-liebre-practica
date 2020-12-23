const express = require("express");
const router = express.Router();
const registerController = require("../controllers/register-controller");
const guestMiddleware = require("../middlewares/guestMiddleware");

router.get("/", guestMiddleware, registerController.show);

module.exports = router;
