const express = require("express");
const router = express.Router();
const loginController = require("../controllers/login-controller");
const { check, validationResult, body } = require("express-validator");

router.get("/", loginController.show);
router.post(
    "/",
    [
        check("username")
            .isLength({ min: 8 })
            .withMessage("El usuario debe tener al menos 8 caracteres"),
        check("password")
            .isLength({ min: 4 })
            .withMessage("La contraseña debe tener al menos 4 caracteres"),
    ],
    loginController.processLogin
);
router.get("/check", function (req, res) {
    if (req.session.usuarioLogueado == undefined) {
        res.send("No estás logueado");
    } else {
        res.send(
            "El usuario logueado es " + req.session.usuarioLogueado.username
        );
    }
});

module.exports = router;
