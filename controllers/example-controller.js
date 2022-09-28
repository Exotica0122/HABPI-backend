const Example = require("../models/example");

/**
 * @author Peter An
 * @description This is how to use JSDocs 
 */
const getExample = (req, res, next) => {
    return res.status(200).json({ msg: "hi" });
};

exports.getExample = getExample;
