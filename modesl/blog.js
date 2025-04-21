const mongoose = require('mongoose');
const { type } = require('os');
const Schema = mongoose.Schema;


// schima is a structure of data base
const blogsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body:{
        type: String,
        required:true
    }
},{timestamps: true});

// looks for blogs collection in db 

const Blog = mongoose.model('Blog',blogsSchema);
module.exports =Blog;
