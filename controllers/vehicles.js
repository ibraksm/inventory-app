const express = require("express");

//DB
const queries = require("../db/queries");

const renderVehicles = async (req, res) => {
  res.render("vehicles", {
    cars: await queries.getAllCars(),
  });
};

const renderAddVehicleForm = async (req, res) => {
  res.render("addVehicle", {
    brands: await queries.getAllVehicleBrands(),
    types: await queries.getAllVehicleTypes(),
  });
};

const renderVehicle = async (req, res) => {
  res.render("vehicle", { car: await queries.getCarById(req.params.car_id)});
};

module.exports = {
  renderVehicles,
  renderVehicle,
  renderAddVehicleForm,
};
