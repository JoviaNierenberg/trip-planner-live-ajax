var dayRouter = require('express').Router();
var attractionRouter = require('express').Router();
var models = require('../models');



// GET /days
dayRouter.get('/', function (req, res, next) {
    // serves up all days as json
    models.Days
        .find({})
        .exec(function (err, data) {
            if (err) return next(err);
            res.send(data);
        });
});
// POST /days
dayRouter.post('/', function (req, res, next) {
    // creates a new day and serves it as json
    //var day = new Day();
    //adding a new empty day and then adding attrations to the day
    //day.restaraunt.concat(req.body);

        console.log("REQ BODY", req.body)
    models.Days
    .create({})
    .then(function(day){
        //console.log("A DAY A DAY",day)
        res.status(201).json(day)
    })
    .then(null, next)
});
// GET /days/:id
dayRouter.get('/:id', function (req, res, next) {
    // serves a particular day as json
});
// DELETE /days/:id
dayRouter.delete('/:id', function (req, res, next) {
    // deletes a particular day
});

dayRouter.use('/:id', attractionRouter);
// POST /days/:id/hotel
attractionRouter.post('/hotel', function (req, res, next) {
    // creates a reference to the hotel
});
// DELETE /days/:id/hotel
attractionRouter.delete('/hotel', function (req, res, next) {
    // deletes the reference of the hotel
});
// POST /days/:id/restaurants
attractionRouter.post('/restaurants', function (req, res, next) {
    // creates a reference to a restaurant
    models.Restaurant
    .create(req.body)
    .then(function(restaurant){
        console.log("REQ BODY", req.body)
        console.log("A restaraunt A restaraunt",restaraunt)
        res.status(201).json(restaraunt)
    })
    .then(null, next)
});
// DELETE /days/:dayId/restaurants/:restId
attractionRouter.delete('/restaurant/:id', function (req, res, next) {
    // deletes a reference to a restaurant
});
// POST /days/:id/thingsToDo
attractionRouter.post('/thingsToDo', function (req, res, next) {
    // creates a reference to a thing to do
});
// DELETE /days/:dayId/thingsToDo/:thingId
attractionRouter.delete('/thingsToDo/:id', function (req, res, next) {
    // deletes a reference to a thing to do
});

module.exports = 
    dayRouter,
    attractionRouter
