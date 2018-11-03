var router = require('express').Router();
var logger = require('../../util/logger');
var controller = require('./tagController');

// lock down the right routes :)
router.param('TagId', controller.params);

router.route('/')
  .get(controller.get)
  .post(controller.post)

router.route('/:TagId')
  .get(controller.getOne)
  .put(controller.put)
  .delete(controller.delete)

module.exports = router;
