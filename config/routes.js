const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');

router.get('/', controller.base);
router.get('/celebrities', controller.showCelebrities)
router.get('/celebrities/new', controller.addCelebrity)
router.post('/celebrities/new', controller.doAddCelebrity)
router.get('/celebrities/:id', controller.celebrityDetail)
router.post('/celebrities/:id/delete', controller.deleteCelebrity)
router.get('/celebrities/:id/edit', controller.editCelebrity)
router.post('/celebrities/:id', controller.doEditCelebrity)

module.exports = router;