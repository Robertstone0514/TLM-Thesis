const express = require('express');

const router = express.Router();
const UserController = require('../controllers/user_controller');

// User Auth
router.put('/login', UserController.loginUser);
router.post('/register', UserController.signupUser);
router.put('/logout', UserController.logoutUser);
router.put('/edit', UserController.editUser);
router.put('/select/photo', UserController.editPhoto);
router.get('/home/data/:id', UserController.getHomeData);
router.delete('/delete/:id', UserController.deleteAccount)

module.exports = router;
