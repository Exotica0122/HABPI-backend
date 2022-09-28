const Example = require("../models/example");

const getExample = (req, res, next) => {
    return res.status(200).json({ msg: "hi" });
};

exports.getExample = getExample;
