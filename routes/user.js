const express = require('express');
const router = express.Router();
const db = require('/Users/victoregazi/crudapi/config/database.js')
const User = require('/Users/victoregazi/crudapi/models/User.js')
const Sequelize = require('sequelize');
const { Pool } = require('pg');
const Op = Sequelize.Op;
const axios = require('axios');


router.get('/', (req, res) => {
    res.render('index.ejs')
})

router.get('/add-user', (req, res) => {
    res.render('add_user.ejs')
})

//Create and save a new user
router.post('/add_user', (req, res) => {
    let { name, email, status, gender } = req.body;
    let errors=[];
    //Authenticate for email&name

    //Check for required fields 
   if(!name || !email) {
        errors.push({ msg: 'Please enter all required fields'})
    } 
    if(errors.length > 0) {
        res.render('add_user', {
          errors,
          name,
          email,
          gender,
          status
        })
    } else {
        User.findOne({ where: {email} }).then(user => {
             if (user) {
                 errors.push({ msg: 'User email is already in use'});
                 res.render('add_user', {
                    errors,
                    name,
                    email,
                    gender,
                    status
                 });
             } else {  
                 const newUser = new User({
                    name,
                    email,
                    gender,
                    status
                 })
                 newUser
                    .save(user)
                    .then(user => {
                        res.redirect('add-user') 
                    })
                    .catch(err => console.log('errors'+ err))
             }
         })
    }
});

//Update User details 
router.put('/add_user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email, status, gender } = req.body;

    Pool.query(
        'UPDATE users SET name =$1, email =$2, status =$3, gender =$4 WHERE id = $5',
        [name, email, status, gender, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User ${name} updated`)
        
    })
})

router.get('/', (req, res) => {
    axios.get('http://localhost:3000/add-user')
         .then((res) => res.render('index', {users : res.data})
         )
         .catch(err => {
             res.send(err);
        })
})
module.exports = router;