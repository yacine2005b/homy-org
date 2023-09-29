const express = require('express');
const blogControler = require('../controlers/blogControler');
const router = express.Router();



router.get('/', blogControler.blog_index)
router.post('/', blogControler.blog_create_post)
router.get('/create', blogControler.blog_create_get)
router.get('/:id', blogControler.blog_details)
//delete request
router.delete('/:id', blogControler.blog_delete)
module.exports = router;