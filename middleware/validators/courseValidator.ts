import { check } from "express-validator";

export const validateCourseFields = () => {
    return [
        check("title").not().isEmpty().withMessage("course title is required."),
        check("introText").not().isEmpty().withMessage("intro text is required."),
        check("description")
            .not()
            .isEmpty()
            .withMessage("description is required")
            .isLength({ max: 500 })
            .withMessage("description length can be more than 500 chars"),
        check("discountedPrice").not().isEmpty().withMessage("discountedPrice is required"),
        check("originalPrice").not().isEmpty().withMessage("originalPrice is required"),
        check("authors").not().isEmpty().withMessage("authors is required"),
        check("modules").not().isEmpty().withMessage("modules is required"),
    ];
};
