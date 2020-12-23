const getProducts = require("../utils/getProducts");

const getFromDB = require("../utils/getFromDB");
const saveInDB = require("../utils/saveInDB");
const getLastId = require("../utils/getLastId");

const fs = require("fs");
const path = require("path");

const productController = {
    getOne: (req, res) => {
        const products = getProducts();
        const requiredProduct = products.find((prod) => {
            return prod.id == req.params.id;
        });
        if (requiredProduct == null) {
            return res
                .status(404)
                .send("404 not found. <br> ¡Houston, poseemos problemas!");
        }

        res.render("products/detail", {
            product: requiredProduct,
        });
    },
    getAll: (req, res) => {
        const products = getProducts();

        res.render("index", {
            products,
        });
    },
    showCreate: (req, res) => {
        res.render("products/create");
    },
    showEdit: (req, res) => {
        const products = getProducts();
        const requiredProduct = products.find((prod) => {
            return prod.id == req.params.id;
        });
        if (requiredProduct == null) {
            return res
                .status(404)
                .send("404 not found. <br> ¡Houston, poseemos problemas!");
        }
        res.render("products/edit", {
            product: requiredProduct,
        });
    },
    create: (req, res, next) => {
        const productsList = getProducts();
        const newProductId = productsList[productsList.length - 1].id + 1;
        const newProduct = {
            id: Number(newProductId),
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            image: req.files[0].filename,
            category: req.body.category,
        };
        productsList.push(newProduct);
        fs.writeFileSync(
            path.join(__dirname, "../data/productsDataBase.json"),
            JSON.stringify(productsList, null, 4)
        );
        res.redirect("products/" + newProductId);
    },
    edit: (req, res) => {
        const productsList = getProducts();

        const selectedProduct = productsList.find((product) => {
            return product.id == req.body.id;
        });

        let filename =
            req.files.length == 0
                ? selectedProduct.image
                : req.files[0].filename;

        const editedProduct = {
            id: Number(req.body.id),
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            image: filename,
            category: req.body.category,
        };

        productsList.splice(
            productsList.indexOf(selectedProduct),
            1,
            editedProduct
        );

        fs.writeFileSync(
            path.join(__dirname, "../data/productsDataBase.json"),
            JSON.stringify(productsList, null, 4)
        );
        res.redirect("/products/" + editedProduct.id);
    },
    delete: (req, res) => {
        const productsList = getProducts();

        const selectedProduct = productsList.find((product) => {
            return product.id == req.body.id;
        });

        productsList.splice(productsList.indexOf(selectedProduct), 1);

        fs.writeFileSync(
            path.join(__dirname, "../data/productsDataBase.json"),
            JSON.stringify(productsList, null, 4)
        );

        const message = "El producto con ha sido borrado.";
        res.send(message);
    },
};

module.exports = productController;
