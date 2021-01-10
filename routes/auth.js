const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");
const { check, validationResult, body } = require("express-validator");
const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/users");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});

var upload = multer({ storage: storage });

router.get("/login", authController.showLogin);
router.post(
    "/login",
    [
        check("username")
            .isLength({ min: 6 })
            .withMessage("El usuario debe tener al menos 6 caracteres")
            .isEmail()
            .withMessage("El usuario debe ser un email válido"),
        check("password")
            .isLength({ min: 4 })
            .withMessage("La contraseña debe tener al menos 4 caracteres"),
    ],
    authController.login
);

router.get("/register", authController.showRegister);
router.post("/register", upload.single("avatar"), authController.register);

module.exports = router;
