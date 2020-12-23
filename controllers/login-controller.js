const { validationResult } = require("express-validator");
const fs = require("fs");
const path = require("path");

const loginController = {
    show: (req, res) => {
        res.render("login");
    },
    processLogin: (req, res) => {
        let errors = validationResult(req);

        if (errors.isEmpty()) {
            let usersJSON = fs.readFileSync(
                path.join(__dirname, "../data/usersDB.json")
            );
            let users;
            if (usersJSON == "") {
                users = [];
            } else {
                users = JSON.parse(usersJSON);
            }

            let usuarioALoguearse; // crea la variable, si la creo dentro del for el scope es local y no la puedo usar fuera

            for (let user of users) {
                if (user.username == req.body.username) {
                    if (user.password == req.body.password) {
                        usuarioALoguearse = user;
                        break;
                    }
                }
            }

            if (usuarioALoguearse == undefined) {
                return res.render("login", {
                    errors: [{ msg: "Credenciales inválidas" }],
                });
            }

            req.session.usuarioLogueado = usuarioALoguearse;

            if (req.body.recordame != undefined) {
                res.cookie("recordame", usuarioALoguearse.username, {
                    maxAge: 60000,
                });
            }

            res.send("LOGIN EXITOSO!!!");
        } else {
            return res.render("login", { errors: errors.errors });
        }
    },
};

module.exports = loginController;
