const mongoose = require('mongoose');
require('dotenv-extended').load();
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://root:root2018@ds139251.mlab.com:39251/facebook-app',{ useNewUrlParser: true },function(err,db){
if (err) {
    console.log("we can not connect to the database"+ err);
    

}else{
    console.log('connected to the database');
    // db.close();
}
})
