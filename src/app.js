const express = require("express") 
require("dotenv").config();
const PORT = process.env.PORT
const conexion = require("../mongo/db");
const tareas= require("./routers/tareas")
const usuarios=require("./routers/usuarios.js");
const jwt = require ("./routers/jwt.js")
 
const app = express();
app.use(express.json());
app.use("/",tareas)
app.use("/",usuarios)
app.use("/",jwt)
 
conexion();
app.listen( PORT, ()=>console.log(`servidor corriendo `))