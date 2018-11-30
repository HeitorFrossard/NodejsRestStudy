var router = require('express').Router();

router.use('/tags', require('./tag/tagRoutes'));
router.use('/users', require('./user/userRoutes'));

module.exports = router;
