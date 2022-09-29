const mongoose = require("mongoose");
const HttpError = require("../../models/http-error");
const Pet = require("../../models/pet");

const getPet = async (req, res) => {
    let pets;

    try {
        pets = await Pet.find();
    } catch (err) {
        return next(new Error("Couldn't find Pets"));
    }
    res.json({ pets: pets.map((pet) => pet.toObject({ getters: true })) });
};

const postPet = async (req, res) => {
    const { name, age, breed } = req.body;
    console.log(req);
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

exports.getPet = getPet;
exports.postPet = postPet;
