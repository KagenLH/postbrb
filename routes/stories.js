const express = require('express');
const { validationResult, Result } = require("express-validator");

const router = express.Router();

const { User, Story } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { loginUser, logoutUser, requireAuth, restoreUser } = require("../auth");
const { storyValidators } = require("../validations");

router.get('/new', csrfProtection, requireAuth, asyncHandler(async(req,res) => {
    res.render('story-form', { csrfToken: req.csrfToken() })
}));


router.get('/:id(\\d+)', asyncHandler(async(req,res) => {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId, {
        include: User
    });
    
    res.render('story', {story})
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
        res.render('story-form', {csrfToken: req.csrfToken(), errors, title, content})

      }

}))

router.get('/:id(\\d+)/update', csrfProtection, requireAuth, asyncHandler(async(req, res)=>{
    storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId)
    const {id, title, content} = story

    res.render('story-update-form',{csrfToken: req.csrfToken(), id, title, content}) 

}))

router.post('/:id(\\d+)/update', csrfProtection, requireAuth, storyValidators, asyncHandler(async(req, res)=> {
   const {title, content} = req.body; 

   const validationErrors = validationResult(req)
   if(validationErrors.isEmpty()){
        const storyId = parseInt(req.params.id, 10)
        // check if way 2 works if this doesn't 
        const updatedStory = await Story.findByPk(storyId)
        story.title = title 
        story.content = content 
        await updatedStory.save()
        res.redirect('/') // maybe we redirect to the page of the updated story  (story/:id)
   } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.render('story', {csrfToken: req.csrfToken(), errors, title, content})
   }
}))

router.post('/:id(\\d+)/delete',  csrfProtection, requireAuth, asyncHandler(async(req, res)=> {
    const storyId = parseInt(req.params.id, 10);
    const story = await Story.findByPk(storyId);
    story.destroy(); 
    res.redirect('/') // do we need to pass token?
}))

module.exports = router;
