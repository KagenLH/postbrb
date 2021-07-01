const express = require('express');
const { validationResult } = require("express-validator");
const Sequelize = require('sequelize');

const router = express.Router();

const { User, Story, Comment } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { requireAuth } = require("../auth");
const { commentValidators } = require("../validations");

const Op = Sequelize.Op;

router.get('/stories/:sid(\\d+)/comments', asyncHandler(async (req,res) => {
    const story_id = req.params.sid;

    const comments = await Comment.findAll({
        where:{story_id},
        order: [['createdAt','DESC']],
        include: User,
    });
    res.json({comments})
}))

router.get('/stories/:sid(\\d+)/comments/:id(\\d+)/edit', requireAuth, asyncHandler(async (req,res) => {

    const story_id = req.params.sid; //might not need it
    const comment_id = req.params.id;
    const user_id = req.session.auth.userId;
    const comment = await Comment.findByPk(comment_id);

    if(comment.user_id === user_id){
        return res.json({comment})
    } else {
        return
    }
}))

router.post('/stories/:sid(\\d+)/comments/new', requireAuth ,commentValidators, asyncHandler(async (req,res) => { //need requireAuth??

    const story_id = req.params.sid;
    const user_id = req.session.auth.userId;
    const validationErrors = validationResult(req);

    if(validationErrors.isEmpty()){
        await Comment.create({story_id, user_id, content})
        //TODO
        // Call the fetchComments again on the front end to display all the comments
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.json({errors});
    }
}))

router.put('/stories/:sid(\\d+)/comments/:id(\\d+)', requireAuth, asyncHandler( async (req,res) => { //need requireAuth??

    const {content} = req.body;
    const comment_id = req.params.id;
    const comment = await Comment.findByPk(comment_id);
    await comment.update({content});

    //TODO
    // call the fetchComments again on the front end
}))

router.delete('/stories/:sid(\\d+)/comments/:id(\\d+)', requireAuth, asyncHandler( async (req,res) => {

    const comment_id = req.params.id;
    const comment = await Comment.findByPk(comment_id);

    const user_id = req.session.auth.userId;

    if(comment.user_id === user_id){
        Comment.destroy();
    } else {
        return
    }

}))
