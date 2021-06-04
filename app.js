const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const shortid = require('shortid');


let url = {
    
}

app.use(express.static('static'));
app.use(express.urlencoded({extended:true}));

app.get('/:shortUrlId',(req,res)=>{
    const longUrl = url[req.params.shortUrlId];
    // res.redirect(longUrl);
    res.send(longUrl);
})

app.post('/',(req,res)=>{
    const longUrl = req.body.longUrl;
    const shortUrlId = shortid.generate();
    url[shortUrlId] = longUrl;
    console.log(url);
    res.send({shortUrl:`https://url-srtnr.herokuapp.com/${shortUrlId}`});
})



app.listen(port,()=>{
    console.log('Server up and running on port 3000');
})