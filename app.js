//REQUIRE
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const recordameMiddleware = require("./middlewares/recordameMiddleware");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

// APP CONFIG
const app = express();

// VIEW ENGINE CONFIG
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(3000, () => {
    console.log("Servidor funcionando");
});

/// APPLY VIEWS VARIABLES ANDS FUNCTIONS

// MIDDLEWARES
app.use(express.static(path.resolve(__dirname, "public")));

app.use(express.urlencoded());
app.use(methodOverride("_method"));
app.use(session({ secret: "Secreto" }));
app.use(cookieParser());
app.use(recordameMiddleware);

/// ROUTES

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
