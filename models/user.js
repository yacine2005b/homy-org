const mongoose = require('mongoose')
const { isEmail } = require('validator')
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


const User = mongoose.model('user', userSchema)

module.exports = User