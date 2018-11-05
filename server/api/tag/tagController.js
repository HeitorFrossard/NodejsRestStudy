var Tag = require('./tagModel');
var _ = require('lodash');
var logger = require('../../util/logger');

exports.params = function(req, res, next, TagId) {
    Tag.find({"TagId":TagId}).limit(1)
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
    // This query returns the most complete list
    Tag.aggregate([
        {$group: {_id:"$TagId",ItemId: {$first: "$ItemId"},
        Cycle: {$first: "$Cycle"},Group: {$first: "$Group"}}}])
    //Tag.find({})
    .exec()
    .then(function(Tags){
      res.json(Tags);
    }, function(err){
      next(err);
    });
};

exports.getLastGroup = function(req, res, next) {
    // This query returns the most complete list
    Tag.aggregate([
        {$group: {_id:"$TagId",ItemId: {$first: "$ItemId"},
        Cycle: {$first: "$Cycle"},Group: {$first: "$Group"}}}])
    //Tag.find({})
    .exec()
    .then(function(Tags){
      res.json(Tags);
    }, function(err){
      next(err);
    });
};

exports.getOne = function(req, res, next) {
      res.json(req.Tag[0]);
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
