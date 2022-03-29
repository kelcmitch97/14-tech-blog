const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// get all posts for homepage
router.get('/', (req, res) => {

    // res.render('homepage');
    console.log('===========');
    Post.findAll({
        attributes: ['id', 'title', 'post_commment', 'created_at'],
        include: [
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'] ,
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({plain: true}));

        console.log(posts);
        res.render('homepage', posts);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// get single post 
router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'title', 'post_commment', 'created_at'],
      include: [
        {
            model: Comment,
            attributes: ['id', 'comment_text', 'user_id', 'post_id', 'created_at'] ,
            include: {
                model: User,
                attributes: ['username']
            }
        },
        {
            model: User,
            attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
  
        const post = dbPostData.get({ plain: true });
  
        console.log(post)
        // pass data into template
        res.render('single-post', post);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// login
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

//   signup
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('signup');
  });
  

  

module.exports = router;

