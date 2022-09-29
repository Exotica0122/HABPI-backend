const mongoose = require("mongoose");
const HttpError = require("../models/http-error")
const Pet = require("../models/pet");


const editPet = async(req,res)=>{
    const userId = req.params.uid
    const { name, age, breed } = req.body;
    // console.log(pet.name)
    
    let updatedPet;
    try{
      updatedPet  = await Pet.findById(userId);
    

    }catch(err){
        return next( new HttpError("Something we wrong, can't update pet",500))
    } 
    updatedPet.name = name;
    updatedPet.age = age;
    updatedPet.breed = breed;
    try{
        updatedPet.save();
    }catch(err){
        return next(
            new HttpError("Something went wrong could not save update pet",500)
        )

    }
    return res.status(200).json({pet:updatedPet.toObject({getters:true})});
};

const deletePet = async (req,res)=> {
    
};

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
exports.editPet = editPet;
