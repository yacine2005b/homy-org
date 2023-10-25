const Homy = require('../models/blog')


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
	blog_delete
}