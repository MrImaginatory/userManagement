import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
    taskName:{
        type:String,
        required:true,
    },
    taskDescription:{
        type:String,
        required:true,
    },
    taskAddedBy:{
        type:String,
        required:true,
    },
    taskAssignedTo:{
        type:String,
        required:true,
    },
    taskStatus:{
        type:String,
        required:true,
        enum:["Pending","In_Progress","Completed"],
        default:"Pending"
    },
},{timestamps:true})

export const taskModel = mongoose.model("taskData", taskSchema);