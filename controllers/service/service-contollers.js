const mongoose = require("mongoose");

const Service = require("../../models/service");

const getAllService = async (req, res, next) => {
    let services;

    try {
        services = await Service.find();
    } catch (err) {
        return next(new Error("Couldn't find Services"));
    }

    res.json({
        services: services.map((service) =>
            service.toObject({ getters: true })
        ),
    });
};

const postService = async (req, res, next) => {
    const { title, jobType, minPrice, maxPrice } = req.body;

    const createdService = new Service({
        title,
        jobType,
        users: [],
        minPrice,
        maxPrice,
    });

    try {
        createdService.save();
    } catch (err) {
        return next(new HttpError("Creating new service failed, please try again.", 500));
    }

    res.status(201).json({ service: createdService.toObject({ getters: true }) });
};

exports.getAllService = getAllService;
exports.postService = postService;
