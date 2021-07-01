const { check, validationResults } = require("express-validator");
const { User, Story } = require("./db/models");
const { checkPassword } = require("./routes/utils");

const signupValidators = [
  check("username")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a username for signup.")
    .isLength({ max: 50 })
    .withMessage("Username must be less than 50 characters.")
    .custom((value) => {
      return User.findOne({ where: { username: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Username is already in use by another account"
          );
        }
      });
    }),

  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Must provide an email for signup.")
    .isLength({ max: 50 })
    .withMessage("E-mail must be less than 50 characters")
    .isEmail()
    .withMessage("Must provide a valid email.")
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (user) {
          return Promise.reject(
            "The provided Email Address is already in use by another account"
          );
        }
      });
    }),

  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a password for signup.")
    .isLength({ max: 30 })
    .withMessage("Password must be less than 30 characters"),

  check("confirmPassword")
    .exists({ checkFalsy: true })
    .withMessage("Must confirm password for signup.")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Comfirm password must match password.");
      }
      return true;
    }),
];

const loginValidators = [
  check("email")
    .exists({ checkFalsy: true })
    .withMessage("Must provide an email for login.")
    .custom((value) => {
      return User.findOne({ where: { email: value } }).then((user) => {
        if (!user) {
          return Promise.reject("There is no user under email provided");
        }
      });
    }),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a password for login.")
    .custom((value, { req }) => {
      return User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (user) {
          return checkPassword(value, user.email).then((isPassword) => {
            if (!isPassword) {
              return Promise.reject("Invalid Password");
            }
          });
        }
      });
    }),
];


const storyValidators = [
  check("title")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a title for the story.")
    .isLength({ max: 100 })
    .withMessage("Title must be less than 100 characters"),
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Must provide content for the story."),
]


const commentValidators = [
  check("content")
    .exists({ checkFalsy: true })
    .withMessage("Must provide a comment for the story.")
    .isLength({ max: 150 })
    .withMessage("Title must be less than 100 characters"),
]


module.exports = {
  signupValidators,
  loginValidators,
  storyValidators,
  commentValidators,
};
