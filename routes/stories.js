const express = require('express');
const { validationResult } = require("express-validator");

const router = express.Router();

const { User, Story } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { loginUser, logoutUser, requireAuth, restoreUser } = require("../auth");
const { storyValidators } = require("../validations");



// router.get('/', asyncHandler((req,res) => {

// }))

router.get('/new', csrfProtection, requireAuth, asyncHandler(async(req,res) => {
    res.render('stories-form', { csrfToken: req.csrfToken() })
}));


router.get('/:id(\\d+)', asyncHandler(async(req,res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId);
    res.render('', {story})
}));


router.post('/new', csrfProtection, requireAuth, storyValidators, asyncHandler(async(req,res) => {
    const { title, content } = req.body;

    const validationErrors = validationResult(req)

    if(validationErrors.isEmpty()){
        //TODO, grab the user_id
        await Story.create({title,content,user_id})
    }
}))

module.exports = router;
