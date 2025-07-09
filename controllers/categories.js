const express = require("express");

//DB
const queries = require("../db/queries");

const renderCategories = async (req, res) => {
  res.render("categories", {
    vehicle_types: await queries.getAllVehicleTypes(),
  });
};

const showAddCategoryForm = (req, res) => {
  res.render("addCategory");
};

const renderCategory = async (req, res) => {
  res.render("category", {
    type: await queries.getVehicleTypeById(req.params.type_id),
    carsOfType: await queries.getAllCarsOfType(req.params.type_id),
  });
};

module.exports = {
  renderCategories,
  showAddCategoryForm,
  renderCategory,
};
