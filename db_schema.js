require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)

const callback = function(err, data){
    if(err){return console.error(err);}
    else{console.log(data);}
}

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    updated_At: {type: Date, default: Date.now},
});

const User = mongoose.model('User', UserSchema)


// User.create({name: 'Mary Smith', email:'mary@smith.com'},callback)

User.find(function(err,users){
    if(err) return console.error(err);
    console.log(users)
});

