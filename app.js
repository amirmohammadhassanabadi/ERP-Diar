const express = require("express");
require("dotenv").config();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const morgan = require("morgan");
const config = require("./config/src/main")[process.env.NODE_ENV];

// creating app - server
const app = express();

// Requests Log
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Create Admin
const admin = require("./config/database/create-admin");

// Testing Imports
const { addTestUser } = require("./test/addUser.test");

// importing routers
const { authRouter } = require("./routers/auth");
const { taskRouter } = require("./routers/task.router");
const { indexRouter } = require("./routers/index.router");
const { adminRouter } = require("./routers/admin.router");

const port = process.env.PORT || 5000;

// static files - public
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

// Request Body handling
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Cookie Parser
app.use(cookieParser());

// Routers
app.use("/auth", authRouter);
app.use("/tasks", taskRouter);
app.use("/admin", adminRouter);
app.use("/", indexRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/Diar-ERP")
  .then(() => {
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
    return admin.createAdmin();
  })
  .then(() => {
    return addTestUser();
  });
