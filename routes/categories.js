const express = require("express");
const router = express.Router();

//CONTROLLERS
const { showAddCategoryForm, renderCategories, renderCategory} = require("../controllers/categories");
const { addVehicleTypePost, typeDelete } = require("../controllers/queries");

router.get("/", renderCategories);
router.get("/add", showAddCategoryForm);
router.post("/add", addVehicleTypePost);
router.get("/:type_id", renderCategory);
router.delete("/:type_id", typeDelete);

module.exports = router;
