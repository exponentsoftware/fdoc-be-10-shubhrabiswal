const express = require('express');
const router = express.Router();
const tagcontroller = require('../controller/tagcontroller')
const auth = require('../middleware/auth')


router.get('/:id',tagcontroller.gettag);
router.post('/',tagcontroller.addtag)
router.put('/:id',tagcontroller.updatetag)
router.delete('/:id',tagcontroller.deletetag)

module.exports = router;