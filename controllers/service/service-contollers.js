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

const getServiceByJobType = async (req, res, next) => {
    const jobtype = req.params.jobtype;
    const job = req.body;
    console.log(jobtype);
    console.log(job);

    let foundServices;

    try {
        foundServices = await Service.find({ jobType: jobtype });
    } catch (err) {
        return next(new Error("Couldn't find pet with id:", petId));
    }

    console.log(foundServices);
    return res.json({
        foundServices: foundServices.map((service) =>
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
        return next(
            new HttpError("Creating new service failed, please try again.", 500)
        );
    }

    return res.status(201).json({
        service: createdService.toObject({ getters: true }),
    });
};

const getServiceById = async (req, res, next) => {
    const serviceId = req.params.sid;
    let foundService;

    try {
        foundService = await Service.findById(serviceId);
    } catch (err) {
        new HttpError("Finding service by id failed, please try again", 500);
    }

    return res
        .status(200)
        .json({ service: foundService.toObject({ getters: true }) });
};

exports.getAllService = getAllService;
exports.postService = postService;
exports.getServiceByJobType = getServiceByJobType;
exports.getServiceById = getServiceById;
