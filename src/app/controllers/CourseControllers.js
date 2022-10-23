const Course = require('../model/Course');
const { mongooseToObject} = require('../../until/mongoose');
class CourseControllers {

    // [GET] /courses/:slug
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
            .then(course => {
                return res.render('courses/show', {course: mongooseToObject(course)});
            })
            .catch(next);

    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create')
    }

    // [POST] /courses/store
    store(req, res, next) {
        req.body.image = `https://i.ytimg.com/vi/${req.body.videoId}/hqdefault.jpg?sqp=-oaymwEbCKgBEF5IVfKriqkDDggBFQAAiEIYAXABwAEG&rs=AOn4CLCq0ykczTD1hduagxUM0XG6yxyNuQ`
        const course = new Course(req.body)
        course.save()
            .then(() => res.redirect('/me/stored/courses'))
            .catch(res => {

            })
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        Course.findById(req.params.id)
            .then(course => res.render('courses/edit', {
                course: mongooseToObject(course)
            }))
            .catch(next);
        
    }
    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next)
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.delete({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [DELETE] /courses/:id/force
    forceDelete(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // [PATCH] /courses/:id/restore
    restore(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }

    // Select all
    // [POST] /courses/handle-form-actions
    handleFormActions(req, res, next) {
        switch(req.body.action) {
            case 'delete':
                Course.delete({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)

                break;
            default:
                res.json({message: 'Action is invalid!'})
        }
    }

    // [POST] /courses/handle-form-trash-actions
    handleFormTrashActions(req, res, next) {
        switch(req.body.action) {
            case 'restore':
                Course.restore({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            case 'forceDelete':
                Course.deleteOne({_id: {$in: req.body.courseIds}})
                    .then(() => res.redirect('back'))
                    .catch(next)
                break;
            default:
                res.json({message: 'Action is invalid!'})

        }
    }
}

module.exports = new CourseControllers;