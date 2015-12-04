var path = require('path');
var express = require('express');
var router = express.Router();
var Drone = require('../models/drone');

router.get('/drones', function (req, res, next) {
    Drone.find(function(err, drones) {
        if(err){
            res.json({"message":err});
        }else{
            res.json(drones);
        }
    });
});
// get one drone
router.get('/drone/:id', function(req, res, next){
    Drone.findById(req.params.id, function(err, drone){
        if(err){
            res.json({"message":err});
        }else{
            res.json(drone);
        }
    });
});
// Post a drone
router.post('/drones', function(req,res,next){
    var newDrone = new Drone(req.body);
    newDrone.save(function(err, drone){
        res.json(drone);
    });
});
// edit one drone
router.put('/drone/:id', function(req,res,next){
    var options = {"new":true};
    Drone.findByIdAndUpdate(req.params.id, req.body, options, function(err, drone){
        if (err){
            res.json({"Message": err});
        }else{
            res.json(drone);
        }
    });
});
// delete a drone
router.delete('/drone/:id', function(req,res,next){
    Drone.findByIdAndRemove(req.params.id, function(err, drones){
        if(err){
            res.json({"message":err});
        }else{
            res.json({"Message":"success"});
        }
    });
});

module.exports = router;
