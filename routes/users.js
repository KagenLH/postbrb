const express = require('express');
const { validationResult } = require("express-validator"); 

const { User } = require("../db/models");
const { asyncHandler, csrfProtection, generatePassword, checkPassword } = require("./utils");
const { loginUser, logoutUser, requireAuth, restoreUser } = require("../auth");
const { signupValidations, signupValidators, loginValidators } = require("../validations");

const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("This route retrieves all the users.");
});

// Send the form to login to the user
router.get('/login', csrfProtection, (req, res) => {
  res.render("user-login", {
    csrfToken: req.csrfToken()
  });
});

// Send the form to register a new user
router.get('/signup', csrfProtection, (req, res)=> {
  res.render("user-register", {
    csrfToken: req.csrfToken()
  });
});

// Retrieve a specific user's page
router.get('/:id(\\d+)', (req, res) => {
  // 
});

// Process the login form/request from the user and create a session
router.post('/login', csrfProtection, loginValidators, asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    const isPassword = await checkPassword(password, email);
    const errors = [];

    if(!user || !isPassword) {
      errors.push("YOU'RE WRONG!!!!");
    }

    if(errors.length) {
      res.render("/users/login", {
        errors,
        csrfToken: csrfToken()
      });
      return;
    } else {
      loginUser(req, res, user);
      res.redirect("/");
      return;
    }
}));

// Process the logout request from the user and terminate the session
router.post('/logout', (req, res) => {

});

// Process the signup form/request from the user and create a new user in the database
router.post('/signup', csrfProtection, signupValidators, asyncHandler(async (req, res, next) => {
  const { username, password, email, avatarUrl } = req.body;

  const emailExists = await User.findOne({ where: { email } });

  const usernameExists = await User.findOne({ where: { username } });

  if(!emailExists && !usernameExists) {
    const validationErrors = validationResult(req);
    const hashedPassword = await generatePassword(password);
    const newUser = await User.create({ username, hashedPassword, email, avatarUrl});
    res.redirect("/");
  } else { 
    const errors = [];
    if(emailExists) errors.push(Error("A user with that email already exists."));
    if(usernameExists) errors.push(Error("A user with that username already exists."));
    next(errors);
  }
}));

// Todo: Routes for followers


module.exports = router;
