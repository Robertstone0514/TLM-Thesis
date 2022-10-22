const express = require('express');

const router = express.Router();
const ImageController = require('../controllers/image_controller');

// Images
router.post('/createImage', ImageController.createImage);
router.get('/findImage/:id', ImageController.findImage);

module.exports = router;
