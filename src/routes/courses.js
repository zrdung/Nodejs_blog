const express = require('express');
const router = express.Router();

const courseController = require('../app/controllers/CourseControllers')

// router.get('/create', 
//     function(req, res, next) {
//         if(req.query.ve === 'vip') {
//             return next();
//         }
//         res.status(403).json({Message: 'Access denied...!'})
//     }, 
//     courseController.create
// );
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.get('/:id/edit', courseController.edit);
router.post('/handle-form-actions', courseController.handleFormActions);
router.post('/handle-form-trash-actions', courseController.handleFormTrashActions);
router.put('/:id', courseController.update);
router.patch('/:id/restore', courseController.restore);
router.delete('/:id', courseController.delete);
router.delete('/:id/force', courseController.forceDelete);
router.get('/:slug', courseController.show);

module.exports = router;