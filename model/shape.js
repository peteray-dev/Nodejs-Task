// const { required } = require('joi')
const mongoose = require('mongoose');

const shapeSchema = new mongoose.Schema({
  shape: {
    type: String,
  },
  dimension: {
    length_a: {
      type: Number,
      trim: true,
    },
    length_b: {
      type: Number,
      trim: true,
    },
    length_c: {
      type: Number,
      trim: true,
    },
    radius: {
      type: Number,
      trim: true,
    },
  },
  result: {
    type: Number,
    trim: true,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
});

const Shape = mongoose.model('Shape', shapeSchema);

module.exports = Shape;
