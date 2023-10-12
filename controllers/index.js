const router = require('express').Router();
const profileRoutes = require('./dashboard-routes');
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes');;

router.use('/api', apiRoutes)
router.use('/', homeRoutes)
router.use('/dashboard', profileRoutes)

module.exports = router;