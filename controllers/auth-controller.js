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

        return res.redirect("/");

        // let motiveToLogin = req.cookies.motiveToLogin;

        // switch (motiveToLogin) {
        //     case "create":
        //         return res.redirect("/products/create");
        //     case "edit":
        //         return res.redirect("/products/:id/edit");
        //     case "":
        //         return res.redirect("/");
        //     default:
        // }
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

        // let redirect;

        // if (req.query.redirect) {
        //     redirect = req.query.redirect;
        //     res.cookie("motiveToLogin", redirect, { maxAge: 10000 });
        // }

        // let message;

        // switch (redirect) {
        //     case "create":
        //         message = "Debe ser administrador para crear un producto";
        //         break;
        //     case "edit":
        //         message = "Debe ser administrador para editar un producto";
        //         break;

        //     default:
        //         message = "";
        //         break;
        // }
        // res.render("login", { message: message });
    },
    showRegister: (req, res) => {
        res.render("register");
    },
};

module.exports = authController;
