const express = require('express');

const mongoose = require('mongoose');
const path = require('path');

const app = express();


const User = require('./routes/User');

mongoose.connect('mongodb+srv://manikandanb:manikandanb@cluster0.brpzn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true,  useUnifiedTopology: true})
    .then(() => {
        console.log('Connected To Database');
    })
    .catch((err)=> {
        console.log(err);
    });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

app.use('/ProfileImage', express.static(path.join('backend/ProfileImage')));

app.use('/api/user', User);
module.exports = app;