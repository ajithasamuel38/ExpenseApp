const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');



router.get('/admin/expense/Userexpenses', userController.getAll);

router.post('/admin/expense/Userexpenses', userController.create);

router.delete('/admin/expense/Userexpenses/:userId', userController.delete);

router.get('/admin/expense/Userexpenses/:userId', userController.getEditProduct);
router.put('/admin/expense/Userexpenses', userController.postEditProduct);

module.exports = router;