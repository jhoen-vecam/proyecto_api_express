const express = require("express");
const { usuarios , tareas } = require("../../mongo/esquema.js");
const { Router } = require("express");
const jwt = require("jsonwebtoken");
const { validarParametros } = require("../../middlewares/routers.js");
const { verificacionToken } = require("../../middlewares/token.js");
const { error } = require("../../middlewares/routers.js"); 
// require("dotenv").config();
// const JWT_SECRET = process.env.password;
const router = Router();
 
router.post("/tareas", validarParametros, async (req, res, next) => {
    console.log("Intentando crear usuario");
    try {
        const crear = req.body;
        const nuevaTarea = new tareas(crear);
        await nuevaTarea.save();
        res.status(200).json({ message: `tarea creada con éxito`, tarea: nuevaTarea });
    } catch (error) {
        next(error); 
    }
}); 

router.get("/tareas", verificacionToken, async (req, res, next) => { 
    console.log("Están viendo los usuarios");
    try {
        const tareass = await tareas.find();
        if (tareass.length > 0) {
            res.status(200).json({ message: "estas son las tareas", tareas: tareass });
        } else {
            res.status(400).json({ message: "No hay tareas" });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/tareas/:id", verificacionToken, async (req, res, next) => { 
    const Id = req.params.id;
    const actualizar = req.body;
    console.log("Actualizando una tarea");
    try {
        const tareaActualizada = await tareas.findByIdAndUpdate(Id, actualizar, { new: true });
        res.status(200).json({ message: "tarea actualizada", tareaActualizada });
    } catch (error) {
        next(error);
    }
});

router.delete("/tareas/:id", verificacionToken, async (req, res, next) => {
    const id = req.params.id;
    console.log("Borraste una tarea");
    try {
        const eliminarTarea = await tareas.findByIdAndDelete(id);
        res.status(200).json({ message: "Se eliminó la tarea", eliminarTarea });
    } catch (error) {
        next(error);
    }
});

router.use(error); 

module.exports = router;
