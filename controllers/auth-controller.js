const getFromDB = require("../utils/getFromDB");
const saveInDB = require("../utils/saveInDB");
const getLastId = require("../utils/getLastId");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const authController = {
    login: (req, res) => {
        let errors = validationResult(req);

        if (!errors.isEmpty()) {
            const errorsUsername = errors.errors.filter(
                (error) => error.param == "username"
            );

            const errorsPassword = errors.errors.filter(
                (error) => error.param == "password"
            );

            return res.render("login", {
                errorsUsername,
                errorsPassword,
            });
        }

        const users = getFromDB("usersDB");

        const user = users.find((user) => {
            return (
                user.username == req.body.username &&
                bcrypt.compareSync(req.body.password, user.password)
            );
        });

        if (!user) {
            return res.redirect("/auth/login?message=invalidlogin");
        }

        req.session.loggedUserId = user.id;

        if (req.body.rememberMe != undefined) {
            res.cookie("rememberMe", user.id, {
                maxAge: 1000 * 60 * 60,
            });
        }

        return res.redirect("/");
    },
    register: (req, res) => {
        const users = getFromDB("usersDB");
        const newUserId = getLastId(users);

        delete req.body.passwordCheck; //TO DO validar password

        const newUser = {
            id: newUserId,
            ...req.body,
            password: bcrypt.hashSync(req.body.password, 10),
            avatar: req.file.filename,
        };

        saveInDB(users, newUser, "usersDB");

        res.redirect("/auth/login");
    },
    showLogin: (req, res) => {
        let message = "";
        res.render("login", { message: message });
    },
    showRegister: (req, res) => {
        res.render("register");
    },
    logOut: (req, res) => {
        req.session.loggedUserId = null;
        res.cookie("rememberMe", null);
        res.redirect("/");
    },
};

module.exports = authController;
