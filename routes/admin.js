const express = require('express');
const router = express.Router();
const adminController=require('../controllers/admin');
const isAuth=require('../middleware/is-auth');

//For Seeing All Cloths
router.get('/allCloth',isAuth,adminController.getAllCloths);

//For Adding Cloth in Database
router.post('/addCloth', isAuth,adminController.postAddCloth);

//For Updating Cloth in Database
router.put('/updateCloth', isAuth,adminController.putUpdateCloth);

//For Deleting Cloth in Database
router.delete('/deleteCloth', isAuth,adminController.deleteCloth);

//For Sharing Cloth with Customers
router.post('/shareCloth',isAuth,adminController.postShareCloth);

module.exports=router;