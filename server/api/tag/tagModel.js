var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
  TagId: {
    type: String,
    required: true,
    unique: true
  },

  ItemId: {
    type: String,
    required: true
  },

  Cycle:{
      type: String,
      required: true
  },

  Group:{
      type: String,
      required: true
  }
});

module.exports = mongoose.model('tag', TagSchema);
