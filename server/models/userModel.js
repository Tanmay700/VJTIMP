const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role : {
        type : String,
        default : "user"
    },
    status : {
        type: Object,
        default:"active"
    }
    

}, {
    timestamps: true
});
const User = mongoose.model("users",userSchema);
module.exports = User;

