const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 7000;

const mongoose = require('mongoose');
const bodyparser = require("body-parser");
mongoose.connect('mongodb://127.0.0.1:27017/ContactInfo');

// define mongoose schema
const ContactSchema = new mongoose.Schema({
    name: String,
    age: String,
    gender: String,
    phone: String,
    email: String,
    desc: String,
    address: String
  });

const Contact = mongoose.model('Contact', ContactSchema);


// For serving static files
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// Set the template engine as pug
app.set('view engine', 'pug')

// Set the views directory
app.set('views', path.join(__dirname, 'views'))

// ENDPOINTS
app.get('/', (req, res)=>{
    const params = { }
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res)=>{
    const params = { }
    res.status(200).render('contact.pug', params);
})

app.post('/contact', (req, res)=>{
    var mydata = new Contact(req.body);
    mydata.save().then(()=>{
        res.send("THIS ITEM HAS BEEN SAVE TO THE DATABASE");
    }).catch(()=>{
        res.status(400).send("ITEM WAS NOT SAVED TO DATABASE");
    })
    // res.status(200).render('contact.pug', params);
})


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});