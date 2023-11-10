const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const { requireAuth } = require('./middleware/middlewareAuth')
const app = express()




const blogRoutes = require('./routes/blogRoutes')
const { render } = require('ejs');

//connect to mongoDB
const uri =
        "mongodb://messi:messi30@ac-q8mqgyr-shard-00-00.plqyjdj.mongodb.net:27017,ac-q8mqgyr-shard-00-01.plqyjdj.mongodb.net:27017,ac-q8mqgyr-shard-00-02.plqyjdj.mongodb.net:27017/yacineblog?ssl=true&replicaSet=atlas-e4d9sp-shard-0&authSource=admin&retryWrites=true&w=majority";
const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
}
mongoose.connect(uri, connectionParams)
        .then((result) => {
                app.listen(5000)
        })
        .catch((err) => console.log(err))



app.set('view engine', 'ejs');
app.use(express.static('public'))
app.use(express.json())
app.use('/fontawesome', express.static(__dirname + '/node_modules/@fortawesome/fontawesome-free'));
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cookieParser())

app.get('/', (req, res) => {
        res.redirect('/homy')
})

app.use('/homy', blogRoutes)

app.get('/about', (req, res) => {
        res.render('about', { title: 'about' })
})



//404 ROUTE
app.use((req, res) => {
        res.status(404).render('p404', { title: 'page not found' })
})
