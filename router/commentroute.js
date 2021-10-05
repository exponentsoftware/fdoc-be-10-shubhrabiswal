const express = require('express');
const router = express.Router();
const commentcontroller = require('../controller/commentcontroller')
const auth = require('../middleware/auth')


router.get('/:id',commentcontroller.getcomment);
router.post('/',commentcontroller.addcomment)
router.put('/:id',commentcontroller.updatecomment)
router.delete('/:id',commentcontroller.deletecomment)

module.exports = router;