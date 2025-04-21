
const express = require('express');
const Blog = require('../modesl/blog');
// const blogController = require('../controller/blogsControler')


const router = express.Router();


// router.get('/',blogController.blog_index);


router.get('/',(req,res)=>{
    Blog.find().sort(({createdAt:-1})).then((result)=>{
        res.render('index',{title: 'All Blogs',blogs:result})
    }).catch((err)=>{
        console.log(err);
    })
})


router.get('/create',(req,res)=>{
    res.render('create',{title: 'Creat a new Blog'});
})
// redirect
router.get('/about-us',(req,res)=>{
    res.redirect('about');
})

router.post('/',(req,res)=>{
    console.log(req.body);
    const blog = new Blog(req.body);
    blog.save()
    .then((result)=>{
        res.redirect('/')
    }).catch((err)=>{
        console.log(err);
    })
})


router.get(('/:id'),(req,res)=>{
    const id = req.params.id;
    console.log(id);
    Blog.findById(id).then((result)=>{
       res.render('details',{blog:result ,title:'Blog Details'});
    }).catch((err)=>{
        res.status(404).render('404',{title:'Blog Not Found'});
        console.log(err);
    })
})


router.delete(('/:id'),(req,res)=>{
    const id =  req.params.id;
    Blog.findByIdAndDelete(id).then((result)=>{
        res.json({redirect: '/'});
    }).catch((err)=>{
        console.log(err);
    })
})

module.exports= router;