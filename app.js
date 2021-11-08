const express = require("express")
const wrap = require("express-async-error-wrapper");
const path = require("path");
const ejs = require("ejs")
const api = require("./api")

const app = express()

app.use(express.static(path.join(__dirname, "/public"), {
	cacheControl: false, // true
	// etag: false,
	// maxAge: "30d"
}));

// Configura o Express para reconhecer dados provenientes do corpo das requisições
// http://expressjs.com/en/api.html#express.json
// http://expressjs.com/en/api.html#express.urlencoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Define o view engine como o ejs e importa o express-ejs-layouts
// https://www.npmjs.com/package/express-ejs-layouts, pois o ejs não
// suporta layouts nativamente: https://www.npmjs.com/package/ejs#layouts
app.set("view engine", "ejs");
app.use(require("express-ejs-layouts"));
app.use((req, res, next) => {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", "-1");
    res.header("Pragma", "no-cache");
    next();
});

app.get("/", wrap(async (req, res) => {
    res.render("index", { dados: await api.getData()});
}));

app.get("/produto", wrap(async (req, res) => {
    res.render("product");
}));
app.get("/supermarket", wrap(async (req, res) => {
    res.render("supermarket");
}));

app.listen(1337, () => console.log("Executando servidor na porta 1337..."))