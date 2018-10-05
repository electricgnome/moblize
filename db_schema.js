require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URL)

const callback = function(err, data){
    if(err){return console.error(err);}
    else{console.log(data);}
}

const UserSchema = new mongoose.Schema({
    key: Number,
    name: String,
    email: String,
    updated_At: {type: Date, default: Date.now},
});

const User = mongoose.model('User', UserSchema)

// User.create({key: 0, name: 'Roger Smith', email:'Roger@smith.com'},callback)
// User.create({key: 1, name: 'Peter Smith', email:'Peter@smith.com'},callback)
// User.create({key: 2, name: 'Mary Smith', email:'Mary@smith.com'},callback)
// User.create({key: 3, name: 'Susan Smith', email:'Susan@smith.com'},callback)



User.find(function(err,users){
    if(err) return console.error(err);
    console.log(users)
});

