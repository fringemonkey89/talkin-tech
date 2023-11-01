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


//login a user
router.post('/login', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username
    }
  })
  .then(dbUserData => {
    if(!dbUserData){
    res.status(404).json({ message: "no user found with that username"});
    return; 
  }
  
  const validPassword = dbUserData.checkPassword(req.body.password);
  if(!validPassword){
    res.status(400).json({ message: "incorrect password"});
    return;
  }

  req.session.save(() => {
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.username;
    req.session.loggedIn = true;

    res.json({ user: dbUserData, message: 'you are now loggin in'});
  })
})
.catch(err => {
  console.log(err);
  res.status(400).json(err)
})
})

// update user information

router.put('/:id', Auth, (req, res) => {
  User.update(req.body, {
    individualHooks: true,
    where: {
      id: req.params.id
    }
  })
  .then(dbUserData => {
    if(!dbUserData[0]) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
    }

    res.json(dbUserData);
})
  .catch(err => {
    console.log(err);
    res.status(400).json(err)
  })
})


module.exports = router;
















            
