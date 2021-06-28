const { check, validationResults } = require("express-validator");

const signupValidators = [
    check("username")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a username for signup.")
    .isLength({ max: 50 })
    .withMessage("Username must be less than 50 characters."),

    check("email")
    .exists({ checkFalsy: true })
    .withMessage("Must provide an email for signup.")
    .isLength({ max: 50 })
    .withMessage("E-mail must be less than 50 characters")
    .isEmail()
    .withMessage("Must provide a valid email."),

    check("password")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a password for signup.")
    .isLength({ max: 30 })
    .withMessage("Password must be less than 30 characters"),

    check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Must confirm password for signup.")
    .custom((value, { req }) => {
        if(value !== req.body.password) {
            throw new Error("Comfirm password must match password.");
        }
        return true;
    })
];

const loginValidators = [
    check("email")
    .exists({ checkFalsy: true })
    .withMessage("Must provide an email for signup."),

    check("password")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a password for signup.")
];

module.exports = {
    signupValidators,
    loginValidators
}