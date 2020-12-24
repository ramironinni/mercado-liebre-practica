const fs = require("fs");

function logger(req, res, next) {
    const url = req.originalUrl;

    fs.appendFileSync("./logs.txt", url + " | " + new Date() + "\n");

    next();
}

module.exports = logger;
