var express = require('express');
var router = express.Router();
var controller = require('../controllers/japanese.controller.js');

router.get('/', controller.index);
// SEARCH
router.get('/search', controller.search)
// CREATE
router.get('/create', controller.getCreate)
router.post('/create', controller.postCreate)
// DELETE
router.get('/delete', controller.getDelete)
router.post('/delete', controller.postDelete)

//VIEW ANH UPDATE
router.get('/:id', controller.view)
router.post('/:id', controller.update)

module.exports = router;
