const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.URI 

const connection = async()=>{
    try{
        await mongoose.connect(uri)
        console.log("conexion mongo db exitosa !! ")
    } catch(error){

        console.error(error)
    }
}

module.exports= connection;