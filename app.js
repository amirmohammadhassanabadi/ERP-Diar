const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// importing routers
const { authRouter } = require("./routers/auth");

// creating app - server
const app = express();

const port = process.env.PORT || 5000;

// static files - public
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Request Body handling
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

// Cookie Parser
app.use(cookieParser());

// Routers
app.use("/auth", authRouter);

app.listen(port, () => {
  console.log(`server running on port ${port}, ${process.env.JWTSECRETKEY}`);
});
