const mongoose = require('mongoose')
const Schema = mongoose.Schema

const homySchema = new Schema({
        expenses: {
                type: String,
                required: true
        },
        sales: {
                type: String,
                required: true
        },
        date: {
                type: Date,
                default: Date.now
        }
}, { timestamps: true })

homySchema.virtual('numericDate').get(function () {
        return this.date.getTime();
});

const Homy = mongoose.model('Homy', homySchema)

module.exports = Homy