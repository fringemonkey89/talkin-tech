const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const Auth = require('../../util/authcheck');

//get every posts

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
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
});

// get one post

router.get('/:id', (req, res) => {
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
            res.status(404).json({ message: 'there is no post with that id'});
            return;
        }
        res.json(dbPostData)
    })
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      })
});

// creating a post

router.post('/', Auth, (req, res) => {
    Post.create({
        title: req.body.title,
        content: req.body.content,
        user_id: req.session.user_id,
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        req.status(400).json(err)
    })
})

// delete a post

router.delete('/:id', Auth, (req, res) => {
   Post.destroy({
    where: {
        id: req.params.id
    }
   }) 
   .then(dbPostData => {
    if(!dbPostData) {
        res.status(404).json({ message: 'there is no post found with this id'});
        return;
    }
    res.json(dbPostData)
   })
   .catch(err => {
    console.log(err);
    res.status(500).json(err)
   });
});

//updating a post

router.put('/:id', Auth, (req, res) => {
    Post.update(
        {
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if(!dbPostData) {
            res.status(404).json({ message: 'there is no post with that id'});
            return;
        }
        res.json(dbPostData)
    })
    .catch(err => {
        console.log(err);
        res.status(400).json(err)
    })
})

module.exports = router;











