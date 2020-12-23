const getProducts = require("../utils/getProducts");

const indexController = {
    show: (req, res) => {
        const products = getProducts();
        res.render("index", {
            products: products,
        });
    },
    pruebaSession: (req, res) => {
        if (req.session.numeroVisita == undefined) {
            req.session.numeroVisita = 0;
        }

        req.session.numeroVisita++;
        res.send("Session tiene el número: " + req.session.numeroVisita);
    },
};

module.exports = indexController;
