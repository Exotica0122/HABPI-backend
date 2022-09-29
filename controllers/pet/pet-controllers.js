const mongoose = require("mongoose");
const HttpError = require("../../models/http-error");
const Pet = require("../../models/pet");

const editPetId = async (req, res, next) => {
  const petId = req.params.pid;
  const { name, age, breed } = req.body;

  let updatedPet;
  try {
    updatedPet = await Pet.findById(petId);
  } catch (err) {
    return next(new HttpError("Something we wrong, can't update pet", 500));
  }
  updatedPet.name = name;
  updatedPet.age = age;
  updatedPet.breed = breed;
  try {
    updatedPet.save();
  } catch (err) {
    return next(
      new HttpError("Something went wrong could not save updated pet", 500)
    );
  }
  return res.status(200).json({ pet: updatedPet.toObject({ getters: true }) });
};

const deletePet = async (req, res, next) => {
  const petId = req.params.pid;
  let petToDelete;
  try {
    petToDelete = await Pet.findById(petId);
  } catch (err) {
    return next(
      new HttpError("Something went wrong finding pet to delete", 500)
    );
  }

  try {
    petToDelete.remove();
  } catch (err) {
    return next(new HttpError("Something went wrong removing pet", 500));
  }
  return res.status(200).json({ pet: petToDelete.toObject({ getters: true }) });
};

const getPetByID = async (req, res, next) => {
  const petId = req.params.pid;
  let foundPet;

  try {
    foundPet = await Pet.findById(petId);
  } catch (err) {
    return next(new Error("Couldn't find pet with id:", petId));
  }

  res.json({ pet: foundPet.toObject({ getters: true }) });
};

const getAllPets = async (req, res, next) => {
  let pets;
  try {
    pets = await Pet.find();
  } catch (err) {
    return next(new Error("Couldn't find Pets"));
  }
  res.json({ pets: pets.map((pet) => pet.toObject({ getters: true })) });
};

const createPet = async (req, res, next) => {
  const { name, age, breed } = req.body;

  const createdPet = new Pet({
    name,
    age,
    breed,
  });

  try {
    createdPet.save();
  } catch (err) {
    return next(new HttpError("Pet creation failed", 500));
  }

  res.status(201).json({ pet: createdPet.toObject({ getters: true }) });
};

exports.getAllPets = getAllPets;
exports.getPetByID = getPetByID;
exports.createPet = createPet;
exports.editPetId = editPetId;
exports.deletePet = deletePet;
