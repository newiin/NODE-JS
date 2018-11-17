const express = require('express');
const Router = express.Router();
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const User = require('../models/User')

/**
 * Home page
 */

Router.get('/', (req, res) => {
    User.find({}).then((users) => {
        User.countDocuments({}).then((totalUser) => {
            User.countDocuments({
                gender: 'male'
            }).then((maleTotal) => {
                User.countDocuments({
                    gender: 'female'
                }).then((femaleTotal) => {
                    let countTotalLikes = 0;
                    let countTotalUnLikes = 0;
                    User.distinct('likes').then((likes) => {
                        likes.forEach(like => {
                            countTotalLikes = countTotalLikes + like
                        });
                        User.distinct('unlikes').then((unlikes) => {
                            unlikes.forEach(unlikes => {
                                countTotalUnLikes = countTotalUnLikes + unlikes
                            });
                           
                            res.render('index', {
                                users: users,
                                totalUser: totalUser,
                                maleTotal: maleTotal,
                                femaleTotal: femaleTotal,
                                countTotalLikes: countTotalLikes,
                                countTotalUnLikes: countTotalUnLikes,
                                message: req.flash('message') ,
                                date:new Date()
                            })
                        }).catch((err) => {
                            console.log(err);

                        })


                    }).catch((err) => {
                        console.log(err);

                    })


                }).catch((err) => {
                    console.log(err);

                })


            }).catch((err) => {
                console.log(err);

            })


        }).catch((err) => {
            console.log(err);

        })

    }).catch((err) => {
        console.log(err);

    })

})

// Delete root
Router.get('/users/:id/delete', (req, res) => {
    User.findByIdAndDelete({
        _id: req.params.id
    }).then((user) => {

        res.redirect('back');
    }).catch((err) => {
        console.log(err);

    })
})
// Edit page
Router.get('/users/:id/edit', (req, res) => {
    User.findById({
        _id: req.params.id
    }).then((user) => {

        res.render('edit-user', {
            user: user
        })
    }).catch((err) => {
        console.log(err);

    })
})
Router.put('/user/:id/edit', (req, res) => {
    req.check('email', 'Invalid email/Email required').isEmail().trim().normalizeEmail();
    req.check('name', 'name can  not be blank').notEmpty().trim().escape();
    req.check('phone', 'phone number can not  be blank').notEmpty().trim();
    let errors = req.validationErrors();
    if (errors) {
        User.findById({_id:req.params.id}).then(user=>{
            res.render('edit-user', {
                errors: errors,
                user:user
            })
        }).catch((err) => {
            console.log(err);
            
        })

        
       
    }else{
     
     
    User.findById({_id:req.params.id}).then((user) => {
       
        user.email = req.body.email;
        user.name = req.body.name;
        user.phone = req.body.phone;
        user.save().then((userSaved) => {
           
            req.flash('message','User has been modified successfully ');
            res.redirect('/')
            
        }).catch((err) => {
           
        })
    }).catch((err) => {
        console.log(err);

        })
    }
})
module.exports = Router;