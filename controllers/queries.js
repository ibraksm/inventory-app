const db = require("../db/queries");

async function addCarPost(req, res) {
  const {
    vehicleBrand,
    vehicleModel,
    vehicleTypes,
    vehicleModelyear,
    vehicleEnergy,
    vehicleGearbox,
    vehicleNumberOfSeats,
    vehicleNumberOfDoors,
  } = req.body;

  const carId = await db.insertCar(
    vehicleBrand,
    vehicleModel,
    vehicleModelyear,
    vehicleEnergy,
    vehicleGearbox,
    vehicleNumberOfSeats,
    vehicleNumberOfDoors,
  );

  const typesArray = Array.isArray(vehicleTypes) ? vehicleTypes : [vehicleTypes];

  for (const typeId of typesArray) {
    await db.insertCarsVehicleTypes(carId, typeId);
  }

  res.redirect("/vehicles/add");
}

async function addVehicleTypePost(req, res) {
  const { categoryName } = req.body;

  if (!categoryName) {
    return res.status(400).send("Category name is required.");
  }

  await db.insertVehicleType(categoryName);

  res.redirect("/categories/add");
}

async function carDelete(req, res) {
  const carId = req.params.car_id;
  try {
    await db.deleteCar(carId);
    res.status(200).json({ message: 'Car deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete car' });
  }
}

async function typeDelete(req, res) {
  const typeId = req.params.type_id;
  try {
    await db.deleteVehicleType(typeId);
    res.status(200).json({ message: 'Type deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete type' });
  }
}

module.exports = {
  addCarPost,
  addVehicleTypePost,
  carDelete,
  typeDelete,
};
