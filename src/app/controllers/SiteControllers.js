const Course = require('../model/Course');
const { multipleMongooseToObject} = require('../../until/mongoose');
class SiteControllers {

    // [GET] /
    index(req, res, next) {
        // callback function

        // Course.find({}, function(err, courses) {
        //     if(!err) {
        //         res.json(courses);
        //         return;
        //     } 
        //         next(err)
            
        // });

        // promises 
        Course.find({})
            .then(courses => res.render('home', {
                courses: multipleMongooseToObject(courses)
            }))
            .catch(next);
        // res.render('home');
    }

    // [GET] /search
    search(req, res) {
        res.render('search');

    }
}

module.exports = new SiteControllers;