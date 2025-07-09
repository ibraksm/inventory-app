const express = require("express");
const router = express.Router();

//CONTROLLERS
const {renderVehicles, renderAddVehicleForm, renderVehicle} = require("../controllers/vehicles");
const {addCarPost, carDelete} = require("../controllers/queries");

router.get("/", renderVehicles);
router.get("/add", renderAddVehicleForm);
router.post("/add", addCarPost);
router.get("/:car_id", renderVehicle);
router.delete("/:car_id", carDelete);

module.exports = router;