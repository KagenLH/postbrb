const express = require('express');
const { validationResult } = require("express-validator");

const { User } = require("../db/models");
const { asyncHandler, csrfProtection, generatePassword, checkPassword } = require("./utils");
const { loginUser, logoutUser, requireAuth, restoreUser } = require("../auth");
const { signupValidators, loginValidators } = require("../validations");

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


    const validationErrors = validationResult(req);

    if(validationErrors.isEmpty()){

      const user = await User.findOne({ where: { email } });
      loginUser(req, res, user);
      req.session.save(() => res.redirect('/'))
      return;

    } else {

      const errors = validationErrors.array().map((error) => error.msg);
      res.render('user-login', {csrfToken: req.csrfToken(), errors, email, password})

    }


}));

// Process the logout request from the user and terminate the session
router.get('/logout', (req, res) => {
  logoutUser(req, res);
  req.session.save(() => res.redirect('/'))

});

// Process the signup form/request from the user and create a new user in the database
router.post('/signup', csrfProtection, signupValidators, asyncHandler(async (req, res, next) => {
  const { username, password, confirmPassword, email, avatarUrl } = req.body;

  const validationErrors = validationResult(req);

    if(validationErrors.isEmpty()){
      const hashedPassword = await generatePassword(password);
      const newUser = await User.create({ username, hashedPassword, email, avatarUrl});
      loginUser(req, res, newUser)

      return req.session.save(() => res.redirect('/'));

  } else {
      const errors = validationErrors.array().map((error) => error.msg);

      res.render('user-register', { csrfToken: req.csrfToken(), errors, username, password, confirmPassword, email, avatarUrl})
  }
}));

// Todo: Routes for followers

router.get("/login/demo", csrfProtection, asyncHandler(async(req, res, next) => {
  const demoUser = await User.findOne({where: {email: 'demo@demo.com' }})
  loginUser(req, res, demoUser)
  req.session.save(() => res.redirect('/'))
}))


module.exports = router;
