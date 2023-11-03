const mongoose = require('mongoose')
const { isEmail } = require('validator')
const bcrypt = require('bcrypt')
const Schema = mongoose.Schema

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'please enter an email'],
		unique: true,
		lowercase: true,
		validate: [isEmail, 'please enter a valid email']
	},
	password: {
		type: String,
		required: [true, 'please enter a password'],
		minlength: [8, 'Minumum password length is 8 characters']
	}
}, { timestamps: true })

userSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt()
	this.password = await bcrypt.hash(this.password, salt)
	next();
});

userSchema.post('save', (doc, next) => {
	console.log('new user was created', doc)
	next()
})

const User = mongoose.model('user', userSchema)

module.exports = User