const express = require('express');
const router = express.Router();
const adminController=require('../controllers/admin');
const isAuth=require('../middleware/is-auth');


router.get('/allCloth',isAuth,adminController.getAllCloths);
router.post('/addCloth', isAuth,adminController.postAddCloth);
router.post('/updateCloth', isAuth,adminController.postUpdateCloth);
router.post('/deleteCloth', isAuth,adminController.postDeleteCloth);
router.post('/shareCloth',isAuth,adminController.postShareCloth);

module.exports=router;