const pool = require("./pool");

//GET
async function getAllCars() {
  const { rows } = await pool.query("SELECT * FROM cars");
  return rows;
}

async function getAllCarsOfType(type_id) {
  const { rows } = await pool.query(
    "SELECT * FROM cars INNER JOIN cars_vehicle_types ON cars.id = cars_vehicle_types.car_id WHERE cars_vehicle_types.vehicle_type_id = $1",
    [type_id]
  );
  return rows;
}

async function getCarById(car_id) {
  const { rows } = await pool.query("SELECT * FROM cars WHERE id = $1", [
    car_id,
  ]);
  return rows[0];
}

async function getAllVehicleBrands() {
  const { rows } = await pool.query("SELECT * FROM vehicle_brands");
  return rows;
}

async function getAllVehicleTypes() {
  const { rows } = await pool.query("SELECT * FROM vehicle_types");
  return rows;
}

async function getVehicleTypeById(type_id) {
  const { rows } = await pool.query(
    "SELECT * FROM vehicle_types WHERE id = $1",
    [type_id]
  );
  return rows[0];
}

async function getVehicleTypesIdsOfCar(car_id) {
  const { rows } = await pool.query(
    "SELECT vehicle_type_id FROM cars_vehicle_types WHERE car_id = $1",
    [car_id]
  );
  return rows;
}

async function getVehicleTypesNamesOfCar(car_id) {
  const { rows } = await pool.query(
    "SELECT name FROM vehicle_types AS vt INNER JOIN cars_vehicle_types AS cvt ON vt.id = cvt.vehicle_type_id WHERE cvt.car_id = $1",
    [car_id]
  );
  return rows;
}

//INSERT
async function insertCar(
  brand,
  model,
  model_year,
  energy,
  gearbox,
  number_of_seats,
  number_of_doors
) {
  const result = await pool.query(
    "INSERT INTO cars (brand, model, model_year, energy, gearbox, number_of_seats, number_of_doors) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id",
    [
      brand,
      model,
      model_year,
      energy,
      gearbox,
      number_of_seats,
      number_of_doors,
    ]
  );

  return result.rows[0].id;
}

async function insertVehicleType(name) {
  const { rows } = await pool.query(
    "SELECT * FROM vehicle_types WHERE name = $1",
    [name]
  );

  const vehicleTypeExists = rows.length > 0;

  if (vehicleTypeExists) {
    console.error("insertVehicleType : Vehicle type already exists.");
    return false;
  }

  await pool.query("INSERT INTO vehicle_types (name) VALUES ($1)", [name]);
  console.log(`Inserted ${name} into vehicle_types`);
  return true;
}

async function insertCarsVehicleTypes(car_id, vehicle_type_id) {
  await pool.query(
    "INSERT INTO cars_vehicle_types (car_id, vehicle_type_id) VALUES ($1, $2)",
    [car_id, vehicle_type_id]
  );
  return true;
}

//DELETE
async function deleteCar(car_id) {
  await pool.query("DELETE FROM cars WHERE id = $1", [car_id]);
}

async function deleteVehicleType(type_id) {
  await pool.query("DELETE FROM vehicle_types WHERE id = $1", [type_id]);
}

module.exports = {
  getAllCars,
  getCarById,
  getAllCarsOfType,
  getVehicleTypeById,
  getAllVehicleBrands,
  getAllVehicleTypes,
  getVehicleTypesIdsOfCar,
  getVehicleTypesNamesOfCar,
  insertCar,
  insertVehicleType,
  insertCarsVehicleTypes,
  deleteCar,
  deleteVehicleType,
};
