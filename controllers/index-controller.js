const getFromDB = require("../utils/getFromDB");

const indexController = {
    show: (req, res) => {
        const products = getFromDB("productsDataBase");

        const productsInSale = products.filter((product) => {
            return product.category == "in-sale";
        });

        const productsVisited = products.filter((product) => {
            return product.category == "visited";
        });

        res.render("index", {
            productsInSale: productsInSale,
            productsVisited: productsVisited,
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
