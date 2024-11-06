const express = require('express');
const router = express.Router();

const paymentController = require('../controllers/payment');
 
 
router.get('/', paymentController.index);
router.post('/payment', paymentController.payment);

module.exports = router;