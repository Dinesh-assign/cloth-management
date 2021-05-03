const express = require('express');
const router = express.Router();
const customerController=require('../controllers/customer');
const isAuth=require('../middleware/is-auth');

//For seeing All shared Cloths with Customer
router.get('/sharedCloths', isAuth,customerController.getSharedCloths);


module.exports=router;