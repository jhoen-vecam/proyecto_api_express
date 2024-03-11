// const express = require("express");
const { usuarios, tareas } = require("../../mongo/esquema");
const jwt = require("jsonwebtoken");
const { parametrosToken } = require("../../middlewares/routers");
const { Router } = require("express");
require("dotenv").config();

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET;
 
router.post("/login", parametrosToken, async (req, res) => {
    const { username, celular } = req.body;
    try {
        const usuario = await usuarios.findOne({ username, celular });
        console.log("Usuario encontrado:", usuario);
        if (usuario) {
            const { rol } = usuario;
            console.log("Rol del usuario:", rol);
            const token = jwt.sign({ username, celular, rol }, JWT_SECRET, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(404).json({ error: "Usuario no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" });
    }
}); 

module.exports = router;
