const getFromDB = require("../../utils/getFromDB");

function assertAdmin(req, res, next) {
    if (!req.loggedUser) {
        let urlToArray = req.path.split("/");
        let lastElement = urlToArray[urlToArray.length - 1];

        res.redirect("/auth/login?redirect=" + lastElement);
    } else {
        const currentUser = req.loggedUser;
        const users = getFromDB("usersDB");
        const user = users.find((user) => user.id == currentUser.id);
        const isAdmin = user.admin;
        if (!isAdmin) {
            res.redirect("/");
        } else {
            next();
        }
    }
}

module.exports = assertAdmin;
