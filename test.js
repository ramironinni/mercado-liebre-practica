const getFromDB = require("./utils/getFromDB");

const getOneFromDB = function (id, filenameDB) {
    const elements = getFromDB(filenameDB);
    const element = elements.find((element) => {
        return element.id == id;
    });
    return element;
};

console.log(getOneFromDB(3, "productsDataBase"));
