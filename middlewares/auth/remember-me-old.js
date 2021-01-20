const getFromDB = require("../../utils/getFromDB");

function rememberMe(req, res, next) {
    let userToLogin;
    if (
        req.cookies.rememberMe != undefined &&
        req.session.loggedUserId == undefined
    ) {
        const users = getFromDB("usersDB");
        userToLogin = users.find((user) => user.id == req.cookies.rememberMe);
    }

    if (userToLogin) {
        req.session.loggedUserId = userToLogin.id;
    }

    next();
}

module.exports = rememberMe;
