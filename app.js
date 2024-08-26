const express = require("express");
const app = express();
require("dotenv").config();
const {authRouter} = require("./routers/auth")

const port = process.env.PORT || 5000;

app.set("view engine", "ejs");

// Routers
app.use("/auth", authRouter)

app.listen(port, () => {
    console.log(`server running on port ${port}`);
})