const router = require('express').Router();
// const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {

    res.render('homepage');
    // console.log('===========');
    // Post.findAll({
    //     attributes: ['id', 'title', 'post_commment', 'created_at'],
    //     include: [
    //         {
    //             model: Comment,
    //             attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'] ,
    //             include: {
    //                 model: User,
    //                 attributes: ['username']
    //             }
    //         },
    //         {
    //             model: User,
    //             attributes: ['username']
    //         }
    //     ]
    // })
    // .then(dbPostData => {
    //     const posts = dbPostData.map(post => post.get({plain: true}));

    //     res.render('homepage', {
    //         posts,
    //         loggedIn: req.session.loggedIn
    //     });
    // })
    // .catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // });
});

module.exports = router;

