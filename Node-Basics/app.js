const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const productRoutes = require("./Routes/products");

const path = require("path");

const app = express(); //initialized express app object

app.set("view engine", "ejs");
app.set("views", "Views");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/admin", productRoutes);

app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  // res.statusCode = 404;
  // res.send("Page not found");
  // res.status(404).send(`<h1>Page Not Found!</h1>`);
  res.render("404", {
    title: "Page Not Found",
  });
});

mongoose
  .connect("mongodb://localhost:27017/myDemoDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("Database connected successfully...");
    app.listen(5000);
  })
  .catch((err) => console.log("Error in connecting DB"));
