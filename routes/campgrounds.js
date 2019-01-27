const express = require('express');
const router = express.Router();
const campground = require('../models/campgrounds')
const User = require('../models/users')
const middleware = require('../middleware')

router.get('/', (req, res) => {
    console.log(req.user)
    campground.find({}, (err, camps) => {
        if (!err) {
            res.render('campground', {
                camps: camps
            })
        }
    })
})

router.get('/new', middleware.isLoggedIn, (req, res) => {
    res.render('campground/new')
})

router.post('/new', middleware.isLoggedIn, (req, res) => {

    let Name = req.body.name;
    let Image = req.body.image;
    let description = req.body.description;
    let price = req.body.price;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newcampground = {
        Name,
        image: Image,
        description,
        author,
        price
    }
    campground.create(newcampground, (err, newdata) => {
        if (!err) {
            console.log(newdata)
            res.redirect('/campgrounds')
        } else {
            console.log(err)
        }
    })
})

router.get('/:id', function (req, res) {
    campground.findById(req.params.id, (err, found) => {
        if (!err) {
            res.render('campground/show', {
                camp: found
            })
        } else {
            console.log(err)
        }
    })
})

router.get('/:id/edit', (req, res) => {
    campground.findById(req.params.id, (err, found) => {
        if (!err) {
            res.render('campground/edit', {
                camp: found
            })
        } else {
            console.log(err)
        }
    })
})

router.put('/:id', function (req, res) {
    let Name = req.body.name;
    let Image = req.body.image;
    let description = req.body.description;
    let price = req.body.price;
    // let author = {
    //     id: req.user._id,
    //     username: req.user.username
    // }
    let Camp = {
        Name,
        image: Image,
        description,
        //author,
        price
    }
    campground.findByIdAndUpdate(req.params.id, Camp, function (err, updatedCamp) {
        if (!err) {
            res.redirect(`/campgrounds/${updatedCamp._id}`)
        } else {
            console.log(err)
        }
    });
});

module.exports = router;
