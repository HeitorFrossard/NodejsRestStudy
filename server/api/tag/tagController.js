var Tag = require('./tagModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, TagId) {
  Tag.findById(TagId)
    .exec()
    .then(function(Tag) {
      if (!Tag) {
        next(new Error('No Tag with that id'));
      } else {
        req.Tag = Tag;
        next();
      }
    }, function(err) {
      next(err);
    });
};

exports.get = function(req, res, next) {
  Tag.find({})
    .exec()
    .then(function(Tags){
      res.json(Tags);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
  var Tag = req.Tag;
  res.json(Tag);
};

exports.put = function(req, res, next) {
  var Tag = req.Tag;

  var update = req.body;

  _.merge(Tag, update);

  Tag.save(function(err, saved) {
    if (err) {
      next(err);
    } else {
      res.json(saved);
    }
  })
};

exports.post = function(req, res, next) {
  var newTag = req.body;
  Tag.create(newTag)
    .then(function(Tag) {
      res.json(Tag);
    }, function(err) {
      logger.error(err);
      next(err);
    });
};

exports.delete = function(req, res, next) {
  req.Tag.remove(function(err, removed) {
    if (err) {
      next(err);
    } else {
      res.json(removed);
    }
  });
};
