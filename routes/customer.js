const express = require('express');
const router = express.Router();
const customerController=require('../controllers/customer');
const isAuth=require('../middleware/is-auth');


router.get('/sharedCloths', isAuth,customerController.getSharedCloths);
//router.post('/allCloths',isAuth,customerController.getAllCloths);

module.exports=router;