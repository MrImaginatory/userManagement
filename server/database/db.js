import mongoose from "mongoose";

const MONGODB_URL = process.env.MONGODB_URL ||"mongodb+srv://gafit10141:qbHJrcVMjEJAxMCv@prabhattest.xahza.mongodb.net" ;
const MONGODB_DATABASE = process.env.MONGODB_DATABASE ||'userManagement';

const connectDB = async()=>{
    try{
        const connectionInstance = await mongoose.connect(`${MONGODB_URL}/${MONGODB_DATABASE}`);
        console.log("Db Connected Successfully");
    }catch(error){
        console.log("Error connection Database",error);
    }
}

export default connectDB;