var express = require('express');
var router = express.Router();

const { User, Story } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { loginUser, logoutUser, requireAuth, restoreUser } = require("../auth");


router.get('/', asyncHandler( async (req,res) => {

  const stories = await Story.findAll({
    include: User,
    order: [['createdAt','DESC']],
  });

  res.render('homepage', { stories });
}));


module.exports = router;
