const { User, Post } = require('../../models');
const sequelze = require('../../config/connection')
const Auth = require('../../util/authcheck')
const router = require('express').Router();

//all users

router.get('/', (req, res) => {
  User.findAll({
    attributes: { exclude: ['password'] }
  })
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
    console.log(err);
    res.status(400).json(err);
  })
})

// logout
router.post('/logout', Auth, (req, res) => {
  if(req.session.loggedIn) {
       req.session.destroy(() => {
         res.status(204).end();
       });
  }
  else {
    res.status(404).end()
  }
});

// delete user

router.delete('/:id', Auth, (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
      }
  })
    .then(dbUserData => {
      if(!dbUserData) {
        res.status(404).json({ message: 'theres no user with that id!' });
        return;
      }
      res.json(dbUserData);
  })
   .catch(err => {
     console.log(err);
     res.status(400).json(err);
   })
 })

module.exports = router;
















            
