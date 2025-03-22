import {taskModel} from '../model/task.model.js';

const getTask = async(req,res)=>{
    try{
        const tasks = await taskModel.find();
        if(!tasks) return res.status(404).json({message:"No tasks found"})
        res.status(200).json(tasks);
    }catch(err){
        res.status(500).json({message:err.message});
    }
}

const addTask = async(req,res)=> {
    try{
        const {taskName,taskDescription,taskAddedBy,taskAssignedTo,taskStatus} = req.body;

        if(!taskName||!taskDescription||!taskAddedBy||!taskAssignedTo||!taskStatus){
            res.status(400).json({message:"Please Fill out all Data"});
        }
        const taskData = {
            taskName:taskName,
            taskDescription:taskDescription,
            taskAddedBy:taskAddedBy,
            taskAssignedTo:taskAssignedTo,
            taskStatus:taskStatus,
        }
        const newTask = new taskModel(taskData);
        await newTask.save();
        res.status(200).json(newTask);
    }catch(err){
        console.log("Error Creating task",err);
        res.status(400).json({message:"Error Creating task"});
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { taskName, taskDescription, taskAddedBy, taskAssignedTo, taskStatus } = req.body;

        const task = await taskModel.findById(id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        // Update the task properties
        task.taskName = taskName;
        task.taskDescription = taskDescription;
        task.taskAddedBy = taskAddedBy;
        task.taskAssignedTo = taskAssignedTo;
        task.taskStatus = taskStatus;

        await task.save(); // Save the updated task

        res.status(200).json(task);
    } catch (err) {
        console.error("Error updating task:", err);
        res.status(500).json({ message: "Error updating task!" });
    }
}

const deleteTask = async(req,res)=>{
    try{
        const {id} = req.params;
        const task = await taskModel.findByIdAndDelete(id);

        if(!task) return res.status(404).json({message:"Task not found"});

        res.status(200).json(task);
    }catch(err){
        console.log("Error Deleting task!",err);
        res.status(400).json({message:"Error Deleting task!"});
    }
}

export {getTask,addTask,updateTask,deleteTask}