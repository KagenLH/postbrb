const express = require('express');
const { validationResult } = require("express-validator");
const Sequelize = require('sequelize');

const router = express.Router();

const { User, Story, Comment } = require("../db/models");
const { asyncHandler, csrfProtection } = require("./utils");
const { requireAuth } = require("../auth");
const { commentValidators } = require("../validations");

const Op = Sequelize.Op;

router.get('/comments', asyncHandler(async (req,res) => {

    // need to grab the story_id from the story im at
    // const story_id = ...

    const comments = await Comment.findAll({
        where:{story_id},
        order: [['createdAt','DESC']],
        include: User,
    });
    res.json({comments})
}))

router.get('/comments/:id(\\d+)/edit', requireAuth, asyncHandler(async (req,res) => {
    // TODO: find a way to handle this route to only work with the comments of a user
    comment_id = req.params.id;
    const comment = await Comment.findByPk(comment_id);
    res.json({comment})
}))

router.post('/comments/new', requireAuth ,commentValidators, asyncHandler(async (req,res) => { //need requireAuth??
    // need to grab the story_id and user_id from the story im at
    // const story_id = ... const user_id = ...

    const validationErrors = validationResult(req);

    if(validationErrors.isEmpty()){
        await Comment.create({story_id, user_id, content})
        // not sure if to return comment or all comments
        //res.json()

    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        res.json({errors});
    }
}))

router.put('/comments/:id(\\d+)', requireAuth, asyncHandler( async (req,res) => { //need requireAuth??

    const {content} = req.body;
    const comment_id = req.params.id;
    const comment = await Comment.findByPk(comment_id);
    await comment.update({content});

    // not sure if to return comment or all comments
    //res.json()
}))

router.delete('/comments/:id(\\d+)', requireAuth, asyncHandler((req,res) => {
// TODO: find a way to handle this route to only work with the comments of a user

    const comment_id = req.params.id;
    const comment = await Comment.findByPk(comment_id);
    Comment.destroy();

    //not sure what to res
}))
