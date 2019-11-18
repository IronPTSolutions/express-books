const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const auth = require('../controllers/auth.controller');
const studentsController = require('../controllers/students.controller');
const tasController = require('../controllers/tas.controller');
const secure = require('../middlewares/secure.mid');

router.get('/', controller.base);

// Auth
router.get('/login', auth.login);
router.post('/login', auth.doLogin);
router.get('/logout', secure.isAuthenticated, auth.doLogout);

//router.use(secure.isAuthenticated);

// Students
router.get('/students', secure.isAuthenticated, studentsController.list);
router.get('/students/create', secure.isAuthenticated, studentsController.create);
router.post('/students/create', secure.isAuthenticated, studentsController.doCreate);
router.get('/students/:id/edit', secure.isAuthenticated, studentsController.edit);
router.post('/students/:id/edit', secure.isAuthenticated, studentsController.doEdit);
router.post('/students/:id/delete', secure.isAuthenticated, studentsController.delete);
router.get('/students/:id', secure.isAuthenticated, studentsController.detail);

// TAs
router.get('/tas', tasController.list);
router.get('/tas/create', tasController.create);
router.post('/tas/create', tasController.doCreate);
router.get('/tas/:id/edit', tasController.edit);
router.post('/tas/:id/edit', tasController.doEdit);
router.post('/tas/:id/delete', tasController.delete);
router.get('/tas/:id', tasController.detail);

module.exports = router;