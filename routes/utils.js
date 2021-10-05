const csrf = require("csurf");
const bcrypt = require("bcryptjs");
const csrfProtection = csrf({ cookie: true });

const { User } = require("../db/models");

const asyncHandler = handler => {
    return (req, res, next) => {
        return handler(req, res, next).catch(next);
    }
};

const generatePassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

const checkPassword = async (password, email) => {
    const user = await User.findOne({ where: { email } });
    const isPassword = await bcrypt.compare(password, user.hashedPassword.toString());
    return isPassword;
}

module.exports = {
    asyncHandler,
    csrfProtection,
    generatePassword, 
    checkPassword
};