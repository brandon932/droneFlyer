var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Drone = new Schema({
  price:Number,
  image:String,
  ip:String
});


module.exports = mongoose.model('drones', Drone);
