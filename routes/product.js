const express = require("express");
const router = express.Router();
const productController = require("../controllers/product-controller");
const path = require("path");

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/images/products");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + "-" + Date.now() + path.extname(file.originalname)
        );
    },
});
var upload = multer({ storage: storage });

const assertIsAdmin = require("../middlewares/auth/assert-is-admin");
const assertSignedIn = require("../middlewares/auth/assert-signed-in");

router.get("/", productController.getAll);
router.post("/", upload.any(), productController.create);

router.get(
    "/create",
    assertSignedIn,
    assertIsAdmin,
    productController.showCreate
);
router.get("/:id", productController.getOne);
router.get(
    "/:id/edit",
    assertSignedIn,
    assertIsAdmin,
    productController.showEdit
);
router.put("/:id", upload.any(), productController.edit);
router.delete("/:id/delete", productController.delete);

module.exports = router;
