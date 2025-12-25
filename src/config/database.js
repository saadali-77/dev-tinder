const mongoose= require('mongoose');
const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://saadnode:noIGzmRmFLB2XqVb@saadnode.y8y7gmu.mongodb.net/newsaad")
}
module.exports= connectDB;


