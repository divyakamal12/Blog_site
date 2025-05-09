const http = require('http');
const fs= require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=>{

    //loadash
    const num = _.random(0,20);
    console.log(num);

    //set header content type
    res.setHeader('Content-Type','text/html');
    let path ='./views/';
    switch(req.url){
        case'/':
        path+= 'index.html';
        res.statusCode=200;
        break;
        case '/about':
        path+= 'about.html';
        res.statusCode=200;
        break;
        case '/about-us':
            // path+= 'about.html';
            res.statusCode=301;
            res.setHeader('Location','/about');
            res.end();
            break;
        default:
            path+='404.html'
            res.statusCode=400;

            break;
    }

    // res.write('<p>hello world</p>');
    // res.write('<p>hello world</p>');

    // res.end();


    // sent html file
    fs.readFile(path,(err,data)=>{
        if(err){
            console.log(err);
            res.end();
        } else{
            // res.write(data);
            res.end(data);
        }
    })
    

});

server.listen(3000,'localhost',()=>{
    console.log('listining for request');
});
