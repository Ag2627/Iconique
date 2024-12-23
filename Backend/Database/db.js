import mongoose from "mongoose";

mongoose.set("bufferTimeoutMS", 60000); // Set timeout to 60 seconds


export const Connection=async (username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@iconique.6pqqj.mongodb.net/?retryWrites=true&w=majority&appName=Iconique`
    try{
        await mongoose.connect(URL,{
            //useUnifiedTopology:true,useNewUrlParser:true
            });
        console.log("Database connected successfully");
    }catch(error){
        console.log("Error while connecting to the database ",error.message);
    }
}
export default Connection;