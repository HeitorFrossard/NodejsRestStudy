var router = require('express').Router();

router.use('/tags', require('./tag/tagRoutes'));

module.exports = router;
