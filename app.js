
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { result } = require('lodash');
const { title } = require('process');
const { render } = require('ejs');
const blogRout = require('./routes/blogRouts');
require('dotenv').config(); 

// console.log(process.env.MD_URL);
const app = express();


// conect to mongo Db
const dbURI = process.env.MD_URL;
const PORT = process.env.PORT || 3000;

mongoose.connect(dbURI).then((result)=>{
    console.log(PORT);
    app.listen(PORT);
}).catch((err)=>console.log(err));

app.set('view engine','ejs');


app.get('/blogs-create',(req,res)=>{
    const blog = new Blog({
        title: 'New Blog2',
        snippet: 'about my new blog',
        body: 'more about my new blog'
    });
    blog.save()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        console.log(err);
    });
})


app.get('/all-blogs',(req,res)=>{
    Blog.find().then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    })

});

app.get('/single-blog',(req,res)=>{
    Blog.findById('6802712b758ae88e0a066630').then((result)=>res.send(result)).catch((err)=>console.log(err));
})

// app.set('views','all html files place')


// app.use((req,res,next)=>{
//     console.log('new request made:');
//   console.log('host: ', req.hostname);
//   console.log('path: ', req.path);
//   console.log('method: ', req.method);
//   next();
// })

// app.use((req,res,next)=>{
//     console.log('next midil ware');
//   next();
// })


// middekware & staticFiles


app.use(express.static('public'));


app.use(morgan('tiny'));
// third part midware
// mid ware for accepting data
app.use(express.urlencoded({extended: true}));

// routes

app.get('/',(req,res)=>{
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.render('index',{title: 'Home',blogs});
    res.redirect('/blogs');
})




app.get('/about',(req,res)=>{
    res.render('about',{title: 'About'});
})



//blog routes
app.use('/blogs',blogRout);





// 404 case
app.use((req,res)=>{
    res.status(404).render('404',{title: '404'});
})


