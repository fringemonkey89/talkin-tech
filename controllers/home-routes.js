const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models')

router.get('/', (req, res) => {

    Post.findAll({
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {   model:User,
                attributes: ['username']
            },
            {
                model:Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: [
                    {
                        model:User,
                        attributes: ['username']
                    }
                    ]
                }
            ]
        }).then(dbPostData => res.json(dbPostData))
        //serialize
          const posts = dbPostData.map(post => post.get({ plain: true }))

          //render
          res.render('homepage', {posts, username: req.session.username, loggedIn: req.session.loggedIn})
          }).catch(err =>{
        console.log(err);
        res.status(500).json(err)
    })


router.get('/login', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('login')
})

router.get('/signup', (req, res) => {
    if(req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('signup')
})



router.get('/post/:id', (req, res) => {

    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        
        include: [
            {   model:User,
                attributes: ['username']
            },
            {
                model:Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: [
                    {
                        model:User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    }).then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'no post with that id'});
            return;
        }
        //serialize data
       const post = dbPostData.get({ plain: true});

       res.render('single-post', {
        post,
        loggedIn: req.session.loggedIn
       })
    })
});

module.exports = router;