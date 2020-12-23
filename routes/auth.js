const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth-controller");

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
router.post("/login", authController.login);

router.get("/register", authController.showRegister);
router.post("/register", upload.single("avatar"), authController.register);

module.exports = router;
