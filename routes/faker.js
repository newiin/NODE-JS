// Module
const express = require('express');
const faker = require('faker');
const Router = express.Router();
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const {
    check,
    validationResult
} = require('express-validator/check');
const {
    matchedData,
    sanitize
} = require('express-validator/filter');
const User=require('../models/User')


// Faker
Router.get('/faker/users',(req,res)=>{
    res.render('faker-insert-users');
});
// faker forusers
Router.post('/faker/users',(req,res)=>{
    req.check('users', 'fill the category').isNumeric();
    let errors = req.validationErrors();
  
    if (errors) {
        res.render('faker-insert-users',{errors:errors});  
    } else {
        let genders = [ 'female' , 'male' ];
         
        for (let i = 0; i < req.body.users; i++) {
            let user=new User();
            user.email=faker.internet.email();
            user.name=faker.name.firstName();
            user.job=faker.name.jobTitle();
            user.gender=faker.random.arrayElement(genders);
            user.phone=faker.phone.phoneNumber();
            user.isAprouved=faker.random.boolean();
            user.likes=faker.random.number();
            user.unlikes=faker.random.number();
            user.save().then(fakeSaved=>{
            
                
            }).catch(err=>{
                console.log(err);
                
            });
            
        }
        res.redirect('/')
    }


    
   
        
    
    
    
});

module.exports = Router;
/**
 * End routing
 */
