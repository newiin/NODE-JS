const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({


    email: {
        type: String,
        
    },
    gender: {
        type: String,
        
    },
    job:{
        type: String,
    },
    name: {
        type: String,

    },

    phone:{
        type: String,
    },

    isAprouved: {
        type: Boolean,
    },
    likes:     { 
        type: Number 
    },
    unlikes:{
        type: Number 
    }

    
   

});

const User = module.exports = mongoose.model('users', UserSchema);