const express = require('express');
const router = express.Router();
const todocontroller = require('../controller/todocontroller')
const viewlikecontroller = require('../controller/viewlikecontroller')
const auth = require('../middleware/auth')

router.get('/like',viewlikecontroller.getlikes) 
router.post('/',todocontroller.addtodo )
router.get('/',todocontroller.getalltodo);
router.get('/:id', todocontroller.gettodoById);
router.put('/:id',todocontroller.updatetodo )
router.delete('/:id',todocontroller.deletetodo )

// router.post('/category',auth.required,todocontroller.bycategory)
// router.post('/title',auth.required,todocontroller.bytitle)
// router.put('/complete/:id',auth.required,todocontroller.completetodo)


router.post('/like/:id',viewlikecontroller.addlike)   


module.exports = router;