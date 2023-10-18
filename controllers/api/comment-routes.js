const router = require('express').Router();
const { User, Post, Comment} = require('../../models')
const Auth = require('../../util/Auth')

// get every comment
router.get('/', (req, res) => {
    Comment.findAll()
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
          console.log(err);
          res.status(400).json(err)
      })
});

// get a single comment
router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    }
  })
  .then(dbCommentData => {
    if(!dbCommentData) {
      res.status(404).json({ message: 'no comment with that id"});
        return;
    };
      res.json(dbCommentData)
  })
  .catch(err => {
    console.log(err);
    res.status(400).json(err)
  })
});

// delete a comment

router.delete('/:id', Auth, (req, res) => {
  Comment.destroy({
    where: {
      id: req.params.id
      }
  })
  .then(dbCommentData => {
    if(!dbCommentData) {
      res.status(404).json({ message: 'no comment with that id'});
      return;
    }
    res.json(dbCommentData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err)
  })
});


// post comment
router.post('/', Auth, (req, res) => {
  Comment.create(
    {
      comment_text: req.body.comment_text,
      user_id: req.session.user_id,
      post_id: req.body.post_id
    }
  )
  .then(dbCommentData => res.json(dbCommentData))
  .catch(err => {
    console.log(err)res.status(500).json(err);
  });
});




  



module.exports = router;














  
    
