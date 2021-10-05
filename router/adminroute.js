const express = require('express');
const router = express.Router();
const admincontroller = require('../controller/admincontroller')
const downloadcont = require('../controller/download')
const auth = require('../middleware/auth')



router.get('/',auth.authadmin.required,admincontroller.getalluser);
router.get('/transactions',auth.authadmin.required,admincontroller.transactions);
router.get('/download', downloadcont.download);  //auth.authadmin.required,

//  http://localhost:5000/api/admin/download



module.exports = router;