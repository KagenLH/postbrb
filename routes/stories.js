const express = require('express');
const { validationResult } = require("express-validator");

const router = express.Router();

const { User, Story } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { loginUser, logoutUser, requireAuth, restoreUser } = require("../auth");
const { storyValidators } = require("../validations");

router.get('/new', csrfProtection, requireAuth, asyncHandler(async(req,res) => {
    res.render('stories-form', { csrfToken: req.csrfToken() })
}));


router.get('/:id(\\d+)', asyncHandler(async(req,res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId, {
        include: User
    });
    
    res.render('', {story})
}));


router.post('/new', csrfProtection, requireAuth, storyValidators, asyncHandler(async(req,res) => {
    const { title, content } = req.body;

    const validationErrors = validationResult(req)

    if(validationErrors.isEmpty()){
        const user_id = req.session.auth.userId;
        await Story.create({title, content, user_id})
        
        return res.redirect('/')
    } else {

        const errors = validationErrors.array().map((error) => error.msg);
        res.render('stories-form', {csrfToken: req.csrfToken(), errors, title, content})
  
      }

}))

module.exports = router;
