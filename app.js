const express = require('express');
const morgan = require('morgan')
const mongoose = require('mongoose')
const app = express()
const Blog = require('./models/blog');
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
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
        res.redirect('/blogs')
})
app.get('/about', (req, res) => {
        res.render('about', { title: 'about' })
})

//blog route
app.get('/blogs', (req, res) => {
        Blog.find().sort({ createdAt: -1 })
                .then((result) => {
                        res.render('index', { title: 'all blogs', blogs: result })

                })
                .catch((err) => console.log(err))
})
app.post('/blogs', (req, res) => {
        const blog = new Blog(req.body)
        blog.save()
                .then((result) => {
                        res.redirect('/blogs')
                })
                .catch((err) => console.log(err))
})

app.get('/blogs/:id', (req, res) => {
        const id = req.params.id
        console.log(id)
        Blog.findById(id)
                .then(result => {
                        res.render('details', { blog: result, title: 'blog details' })
                })
                .catch((err) => console.log(err))

})
app.get('/blog/create', (req, res) => {
        res.render('create', { title: 'Create Blog' })
})
//delete request
app.delete('/blogs/:id', (req, res) => {
        const id = req.params.id
        Blog.findByIdAndDelete(id)
                .then((result) => {
                        res.json({
                                redirect: '/blogs',
                        })
                })
                .catch((err) => console.log(err))
})

//404 ROUTE
app.use((req, res) => {
        res.status(404).render('p404', { title: 'page not found' })
})
