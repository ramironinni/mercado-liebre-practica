const getFromDB = require("../utils/getFromDB");
const saveInDB = require("../utils/saveInDB");
const editInDB = require("../utils/editInDB");
const getLastId = require("../utils/getLastId");

const fs = require("fs");
const path = require("path");
const deleteFromDB = require("../utils/deleteFromDB");

const productController = {
    getOne: (req, res) => {
        const products = getFromDB("productsDataBase");
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
        const products = getFromDB("productsDataBase");

        res.render("index", {
            products,
        });
    },
    showCreate: (req, res) => {
        res.render("products/create");
    },
    showEdit: (req, res) => {
        const products = getFromDB("productsDataBase");
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
        const productsList = getFromDB("productsDataBase");

        const newProductId = getLastId(productsList);

        const newProduct = {
            id: Number(newProductId),
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            discount: Number(req.body.discount),
            image: req.files[0].filename,
            category: req.body.category,
        };

        saveInDB(productsList, newProduct, "productsDataBase");

        res.redirect("products/" + newProductId);
    },
    edit: (req, res) => {
        const productsList = getFromDB("productsDataBase");

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

        editInDB(
            productsList,
            selectedProduct,
            editedProduct,
            "productsDataBase"
        );

        res.redirect("/products/" + editedProduct.id);
    },
    showDelete: (req, res) => {
        res.render("delete-confirmation");
    },
    delete: (req, res) => {
        const { message, successfulDelete } = deleteFromDB(
            req.body.id,
            "productsDataBase"
        );

        res.send(message);
    },
};

module.exports = productController;
