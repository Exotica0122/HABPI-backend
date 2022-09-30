const mongoose = require("mongoose");

const User = require("../../models/user");
const HttpError = require("../../models/http-error");

/**
 * Only for testing purposes
 * @todo Delete this on release builds
 *       because it is unsafe
 */
const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find().populate("pets").populate("services");
    } catch (err) {
        return next(new Error("Couldn't find Users"));
    }

    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const getUserById = async (req, res, next) => {
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findById(userId)
            .populate("pets")
            .populate("services");
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not find the user"),
            500
        );
    }

    if (!user) {
        return next(
            new HttpError("Couldn't find the user with provided id.", 404)
        );
    }

    const userJSON = {
        name: user.name,
        email: user.email,
        age: user.age,
        gender: user.gender,
        phone: user.phone,
        pets: user.pets,
        services: user.services,
    };

    return res.status(200).json(userJSON);
};

const addPetToUser = async (req, res, next) => {
    const userId = req.params.uid;
    const { petId } = req.body;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not find the user"),
            500
        );
    }

    if (!user) {
        return next(
            new HttpError("Couldn't find the user with provided id.", 404)
        );
    }

    user.pets.push(petId);

    try {
        user.save();
    } catch (err) {
        return next(new HttpError("Adding pet failed, please try again.", 500));
    }

    return res.status(201).json({ message: "Successfully added pet to user!" });
};
const removePetFromUser = async (req, res, next) => {
    const userId = req.params.uid;
    const { petId } = req.body;

    let user;
    try {
        user = await User.findById(userId);
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not find the user"),
            500
        );
    }

    if (!user) {
        return next(
            new HttpError("Couldn't find the user with provided id.", 404)
        );
    }

    user.pets.filter((pet)=> pet!== petId);
    console.log(user.pets)
    try {
        user.save();
    } catch (err) {
        return next(new HttpError("Adding pet failed, please try again.", 500));
    }

    return res.status(201).json({ message: "Successfully added pet to user!" });
};

const getAllPetsByUserId = async (req, res, next) => {
    const userId = req.params.uid;

    let user;
    try {
        user = await User.findById(userId)
            .populate("pets")
            .populate("services");
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not find the user"),
            500
        );
    }

    if (!user) {
        return next(
            new HttpError("Couldn't find the user with provided id.", 404)
        );
    }
    const pets = user.pets;

    return res
        .status(200)
        .json({ pets: pets.map((pet) => pet.toObject({ getters: true })) });
};

const postSignUp = async (req, res, next) => {
    const { name, email, password, age, gender, phone } = req.body;

    let signupUser;
    try {
        signupUser = await User.findOne({ email });
    } catch (err) {
        return next(
            new HttpError("Signing up failed, please try again later", 500)
        );
    }

    if (signupUser) {
        return next(
            new HttpError("User exists already, please login instead.", 422)
        );
    }

    const createdUser = new User({
        name,
        email,
        password,
        age,
        gender,
        phone,
        pets: [],
        services: [],
    });

    try {
        createdUser.save();
    } catch (err) {
        return next(new HttpError("Signing up failed, please try again.", 500));
    }

    res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const postLogin = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (err) {
        return next(
            new HttpError("Logging in failed, please try again later.", 500)
        );
    }

    if (!existingUser || existingUser.password !== password) {
        return next(
            new HttpError("Invalid credentials, could not log you in.", 401)
        );
    }

    return res.json({
        message: "Logged In!",
        user: existingUser.toObject({ getters: true }),
    });
};

/**
 *
 * @todo add auth
 * because this is unsafe
 */
const updateUserById = async (req, res, next) => {
    const userId = req.params.uid;

    const { name, email, password, age, gender, phone } = req.body;

    let updatedUser;
    try {
        updatedUser = await User.findById(userId);
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not update place.", 500)
        );
    }
    updatedUser.name = name;
    updatedUser.email = email;
    updatedUser.password = password;
    updatedUser.age = age;
    updatedUser.gender = gender;
    updatedUser.phone = phone;

    try {
        await updatedUser.save();
    } catch (err) {
        return next(
            new HttpError("Something went wrong, could not update place.", 500)
        );
    }

    return res
        .status(200)
        .json({ user: updatedUser.toObject({ getters: true }) });
};

exports.getAllUsers = getAllUsers;
exports.getUserById = getUserById;
exports.addPetToUser = addPetToUser;
exports.getAllPetsByUserId = getAllPetsByUserId;
exports.postSignUp = postSignUp;
exports.postLogin = postLogin;
exports.updateUserById = updateUserById;
exports.removePetFromUser=removePetFromUser;
