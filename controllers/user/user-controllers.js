const mongoose = require("mongoose");

const User = require("../../models/user");

const getAllUsers = async (req, res, next) => {
    let users;

    try {
        users = await User.find();
    } catch (err) {
        return next(new Error("Couldn't find Users"));
    }

    res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const postSignUp = async (req, res, next) => {
    const { name, email, age, gender, phone } = req.body;

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

const updateUserById = async (req, res, next) => {
    const userId = req.params.uid;

    console.log(userId);
    const { name, email, age, gender, phone } = req.body;

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
exports.postSignUp = postSignUp;
exports.updateUserById = updateUserById;
