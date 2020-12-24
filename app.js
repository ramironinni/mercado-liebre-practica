//REQUIRE
const express = require("express");
const path = require("path");
const methodOverride = require("method-override");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const fs = require("fs");

const toThousand = require("./utils/toThousand");
const recordameMiddleware = require("./middlewares/recordameMiddleware");
const authenticate = require("./middlewares/auth/authenticate");

const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");

const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs.txt"), {
    flags: "a",
});

// APP CONFIG
const app = express();

// VIEW ENGINE CONFIG
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.listen(3000, () => {
    console.log("Servidor funcionando");
});

/// APPLY VIEWS VARIABLES AND FUNCTIONS
app.locals.toThousand = toThousand;
app.locals.user = null;

// MIDDLEWARES
app.use(morgan("tiny", { stream: accessLogStream }));
app.use(express.static(path.resolve(__dirname, "public")));

app.use(session({ secret: "Secreto" }));
app.use(cookieParser());
app.use(express.urlencoded());
app.use(methodOverride("_method"));
app.use(recordameMiddleware);
app.use(authenticate);

/// ROUTES

app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/products", productRouter);
