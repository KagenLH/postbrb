var express = require('express');
var router = express.Router();

const { User, Story } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { loginUser, logoutUser, requireAuth, restoreUser } = require("../auth");


/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'a/A Express Skeleton Home' });
// });

router.get('/', asyncHandler( async (req,res) => {

  const stories = await Story.findAll();

  res.render('index', { title: 'a/A Express Skeleton Home', stories});
  // res.render('homepage', { title: 'a/A Express Skeleton Home', stories});
}));


module.exports = router;
