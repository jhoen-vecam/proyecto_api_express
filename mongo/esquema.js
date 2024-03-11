const mongoose= require("mongoose");


const usuarios_esquema = new mongoose.Schema({
    username:{
type: String,
unique : true,
required:true
}, celular:{
    type :Number,
    required : true
},
})


const tareas_esquema =new mongoose.Schema({
    title:{
        type: String,
        required:true
    },
     description: {
        type:String,
    required:true,
    }, 
    completed:{
        type:Boolean,
        required:true,
        default:false}
    })

    const tareas= mongoose.model("tareas",tareas_esquema , "tareas");
    const usuarios= mongoose.model("usuarios",usuarios_esquema, "usuarios");

    module.exports ={tareas,usuarios};