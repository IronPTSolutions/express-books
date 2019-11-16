const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const studentsController = require('../controllers/students.controller');
const tasController = require('../controllers/tas.controller');

router.get('/', controller.base);

// Students
router.get('/students', studentsController.list);
router.get('/students/create', studentsController.create);
router.post('/students/create', studentsController.doCreate);
router.get('/students/:id/edit', studentsController.edit);
router.post('/students/:id/edit', studentsController.doEdit);
router.post('/students/:id/delete', studentsController.delete);
router.get('/students/:id', studentsController.detail);

// TAs
router.get('/tas', tasController.list);
router.get('/tas/create', tasController.create);
router.post('/tas/create', tasController.doCreate);
router.get('/tas/:id/edit', tasController.edit);
router.post('/tas/:id/edit', tasController.doEdit);
router.post('/tas/:id/delete', tasController.delete);
router.get('/tas/:id', tasController.detail);

module.exports = router;