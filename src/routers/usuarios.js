// const express = require("express");
const { Router } = require("express");
const { validarParametros } = require("../../middlewares/routers.js");
const { usuarios , tareas } = require("../../mongo/esquema.js");
const { verificacionToken } = require("../../middlewares/token.js"); 
const { error } = require("../../middlewares/routers.js"); 
const router = Router();

router.post("/usuarios", validarParametros, async (req, res, next) => {
    console.log("Intentando crear usuario");
    try {
        const crear = req.body;
        const nuevoUsuario = new usuarios(crear);
        await nuevoUsuario.save();
        res.status(200).json({ message: `Usuario registrado con éxito`, usuario: nuevoUsuario });
    } catch (error) {
        next(error); 
    }
});
 
router.get("/usuarios", verificacionToken, async (req, res, next) => {
    console.log("Están viendo los usuarios");
    try {
        const usuarioss = await usuarios.find();
        if (usuarioss.length > 0) {
            res.status(200).json({ message: "Estos son los usuarios", usuarios: usuarioss   });
        } else {
            res.status(400).json({ message: "No hay usuarios" });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/usuarios/:id", verificacionToken, async (req, res, next) => {
    const Id = req.params.id;
    const actualizar = req.body;
    console.log("Actualizando un usuario");
    try {
        const usuarioActualizado = await usuarios.findByIdAndUpdate(Id, actualizar, { new: true });
        res.status(200).json({ message: "Usuario actualizado", usuarioActualizado });
    } catch (error) {
        next(error);
    }
});

router.delete("/usuarios/:id", verificacionToken, async (req, res, next) => {  
      const id = req.params.id;
    console.log("Borraste un usuario");
    try {
        const eliminarUsuario = await usuarios.findByIdAndDelete(id);
        res.status(200).json({ message: "Se eliminó el usuario", eliminarUsuario });
    } catch (error) {
        next(error);
    }
});

router.use(error); 
module.exports = router;
