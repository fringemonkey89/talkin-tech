const router = require('express').Router();
const sequelize = require('../../config/connection');
const {Post, User, Comment} = require('../../models')
//authorization
const Auth = require('../util/authcheck');

router.get('/', Auth,(req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: ['id', 'title', 'content', 'created_at'],
        order: [['created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    }
                ]
            }
        ]
    })
}).then(dbPostData => {
    // serialize
    const posts = dbPostData.map(post => post.get({ plain: true}));
    res.render('profile', {posts, loggedIn: true })

}).catch(err => {
    console.log(err);
    res.status(500).json(err)
})

router.get('/edit/:id', ,(req, res) => {

}).then( => {

}).catch(err => {
    
})

module.exports = router;