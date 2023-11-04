const Homy = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

const handleErrors = (err) => {
	console.log(err.message, err.code)
	let errors = { email: '', password: '' }
	//duplicate gmail  
	if (err.code === 11000) {
		errors.email = 'this email is already registered'
		return errors
	}

	//validation errors
	if (err.message.includes('user validation failed')) {
		Object.values(err.errors).forEach(({ properties }) => {
			errors[properties.path] = properties.message
		})
	}
	return errors
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
	return jwt.sign({ id }, 'net ninja secret', {
		expiresIn: maxAge
	});
};

const blog_index = (req, res) => {
	Homy.find()
		.then((result) => {
			res.render('index', { title: 'HOMY', homies: result })

		})
		.catch((err) => console.log(err))
}

const blog_details = (req, res) => {
	const id = req.params.id
	console.log(id)
	Homy.findById(id)
		.then(result => {
			res.render('details', { homy: result, title: 'HOMY details' })
		})
		.catch((err) => console.log(err))

}
const blog_create_get = (req, res) => {
	res.render('create', { title: 'Create Blog' })
}
const blog_create_post = (req, res) => {
	const homy = new Homy(req.body)
	homy.save()
		.then((result) => {
			res.redirect('/homy')
		})
		.catch((err) => console.log(err))
}
// authentification controlers
const signUp_get = (req, res) => {
	res.render('signup', { title: 'signup' })
}
const signUp_post = async (req, res) => {
	const { email, password } = req.body
	try {
		const user = await User.create({ email, password })
		const token = createToken(user._id)
		res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
		res.status(201).json({ user: user._id });
	}
	catch (err) {
		const errors = handleErrors(err)
		res.status(404).json({ errors })
	}
}
const login_get = (req, res) => {
	res.render('login', { title: 'login' })
}
const login_post = (req, res) => {
	const { email, password } = req.body
	console.log(email, password)
	res.send(' new login')
}

const blog_delete = (req, res) => {
	const id = req.params.id
	Homy.findByIdAndDelete(id)
		.then((result) => {
			res.json({
				redirect: ('/homy'),
			})
		})
		.catch((err) => console.log(err))
}

module.exports = {
	blog_index,
	blog_details,
	blog_create_get,
	blog_create_post,
	signUp_get,
	signUp_post,
	login_get,
	login_post,
	blog_delete

}