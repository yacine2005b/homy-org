const express = require('express');
const blogControler = require('../controlers/blogControler');
const router = express.Router();



router.get('/', blogControler.blog_index)
router.post('/', blogControler.blog_create_post)
router.get('/create', blogControler.blog_create_get)
//authentification routes
router.get('/signup', blogControler.signUp_get)
router.post('/signup', blogControler.signUp_post)
router.get('/login', blogControler.login_get)
router.post('/login', blogControler.login_post)

router.get('/:id', blogControler.blog_details)



module.exports = router;