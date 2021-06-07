const express = require('express');
const morgan = require('morgan');
const mongoose= require('mongoose')

const { render } = require('ejs');
//routes
const blogRoutes= require('./routes/blogRoutes');

// express app
const app = express();



//connect to MongoDB
const dbURI='mongodb+srv://kevin:test1234@cluster0.v2oqh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
// listen for requests
mongoose.connect(dbURI, {useNewUrlParser:true, useUnifiedTopology: true})
  .then((result)=>app.listen(3001))
  .catch((err)=>console.log(err))



// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
//middleware for accepting form data
app.use(express.urlencoded({extended:true}))

app.use(morgan('dev'));


app.get('/', (req, res) => {
  res.redirect('/blogs')
});


app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

//blog routes'

app.use('/blogs',blogRoutes)

// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});