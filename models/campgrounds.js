const mongoose = require("mongoose");
const CampgroundSchema = new mongoose.Schema({
    Name : String,
    image : String,
    description : String,
    price : Number,
    comments : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Comment"
        }
    ],
    author :{
        id : {
            type:mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username  : String,
    },
    created:{
        type : Date,
        default :Date.now()
   }
});
module.exports = mongoose.model('Campground',CampgroundSchema);