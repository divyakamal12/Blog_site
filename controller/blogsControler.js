const Blog = require('../modesl/blog');


const blog_index = (req,res)=>{
    Blog.find().sort(({createdAt:-1})).then((result)=>{
        res.render('index',{title: 'All Blogs',blogs:result})
    }).catch((err)=>{
        console.log(err);
    })
}

module.exports={
    blog_index
}