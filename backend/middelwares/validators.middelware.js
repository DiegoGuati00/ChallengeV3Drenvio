const { validationResult } = require("express-validator");

exports.validateResult = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const errorMsg = errors
            .array();
        res.status(400).json(errorMsg);
    }else{
        next();
    }
};