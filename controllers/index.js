const router = require('express').Router();
const profileRoutes = require('./profile-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');;

router.use('/api', apiRoutes)
router.use('/', homeRoutes)
router.use('/profile', profileRoutes)

router.use((req, res) => {
    res.status(404).end();
})

module.exports = router;