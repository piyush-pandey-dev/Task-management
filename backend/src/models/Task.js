import mongoose from "mongoose";

const taskSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },status:{
        type:String,
        enum:['Pending','In Progress','Completed'],
        default:"Pending"
    },
    dueDate:{
        type:Date,
    }
},{timestamps:true});

const taskModel=mongoose.model("tasks",taskSchema);

export default taskModel;