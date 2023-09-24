app.get('/add-blog', (req, res) => {
        const blog = new Blog({
                title: 'new blog 2',
                snippet: 'about my new blog',
                body: 'more about my new blog'
        })
        blog.save()
                .then((result) => {
                        res.send(result)
                })
                .catch((err) => {
                        console.log(err)
                })
})
app.get('/all-blogs', (req, res) => {
        Blog.find()
                .then((result) => {
                        res.send(result)
                })
                .catch((err) => {
                        console.log(err)
                })
})

app.get('/sigle-blog', (req, res) => {
        Blog.findById("650f37cc05fb252157ce903b")
                .then((result) => {
                        res.send(result)
                })
                .catch((err) => console.log(err))
})
