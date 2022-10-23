const Course = require('../model/Course');
const { multipleMongooseToObject} = require('../../until/mongoose');
class MeControllers {

    // [GET] /me/stored/courses
    storedCourses(req, res, next) {
        Promise.all([Course.find({}), Course.countDocumentsDeleted()])
            .then(([course, deleteCount]) => 
                   res.render('me/stored-courses', {
                    deleteCount,
                    course: multipleMongooseToObject(course)
                })
            )
            .catch(next)
    }

    // [GET] /me/trash/courses
    trashCourses(req, res, next) {
        Course.findDeleted({})
            .then(course => res.render('me/trash-courses', {
                course: multipleMongooseToObject(course)
            }))
            .catch(next)
    }

}

module.exports = new MeControllers;