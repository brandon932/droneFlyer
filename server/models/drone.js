var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Drone = new Schema({
  name:String,
  description:String,
  price:Number,
  image:String,
  ip:String,
  rented: {type:Boolean, default:false}
});


module.exports = mongoose.model('drones', Drone);
