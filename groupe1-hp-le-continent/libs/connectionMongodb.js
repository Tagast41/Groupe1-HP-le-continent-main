import mongoose from "mongoose";

export const connectoDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO);
        console.log("Connexion a MongoDB etablie")
        
    }catch(error){
        console.log("Erreur de connexion a MongoDB", error)
    }
};