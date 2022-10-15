"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCourseFields = void 0;
const express_validator_1 = require("express-validator");
const validateCourseFields = () => {
    return [
        (0, express_validator_1.check)("title").not().isEmpty().withMessage("course title is required."),
        (0, express_validator_1.check)("introText").not().isEmpty().withMessage("intro text is required."),
        (0, express_validator_1.check)("description")
            .not()
            .isEmpty()
            .withMessage("description is required")
            .isLength({ max: 500 })
            .withMessage("description length can be more than 500 chars"),
        (0, express_validator_1.check)("discountedPrice").not().isEmpty().withMessage("discountedPrice is required"),
        (0, express_validator_1.check)("originalPrice").not().isEmpty().withMessage("originalPrice is required"),
        (0, express_validator_1.check)("authors").not().isEmpty().withMessage("authors is required"),
        (0, express_validator_1.check)("modules").not().isEmpty().withMessage("modules is required"),
    ];
};
exports.validateCourseFields = validateCourseFields;
