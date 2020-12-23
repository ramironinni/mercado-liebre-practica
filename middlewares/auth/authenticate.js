const getFromDB = require("../../utils/getFromDB");

function authenticate(req, res, next) {
    const id = req.session.loggedUserId;

    if (!id) return next();

    const users = getFromDB("usersDB");

    const loggedUser = users.find((user) => {
        return user.id == id;
    });

    if (!loggedUser) {
        delete req.session.loggedUserId;
        return next();
    }

    req.loggedUser = loggedUser;

    next();
}

module.exports = authenticate;
