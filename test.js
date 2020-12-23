const getFromDB = require("./utils/getFromDB");

const products = getFromDB("productsDataBase");

const productsInSale = products.filter((product) => {
    return product.category == "in-sale";
});

console.log(productsInSale);
