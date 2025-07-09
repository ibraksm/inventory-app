//MODULES
const express = require("express");
const path = require("path");

const app = express();
const pool = require("./db/pool");
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname , "/public")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//ROUTES
const categoriesRouter = require("./routes/categories");
const vehiclesRouter = require("./routes/vehicles");

app.get("/", (req, res) => {res.render('home');});
app.use("/categories", categoriesRouter);
app.use("/vehicles", vehiclesRouter);

const queries = require("./db/queries");

async function db() {
    await pool.connect();
    console.log(await queries.getAllCars());
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
})