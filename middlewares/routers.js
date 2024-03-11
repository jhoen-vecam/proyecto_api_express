const express = require("express");
const app = express();
app.use(express.json());

const validarParametros = (req, res, next) => { 
    const { title, description, completed, username, rol, celular } = req.body;

    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({ message: "El cuerpo de la solicitud está vacío" });
    } else {
        next(); 
    }
};

const parametrosToken = (req, res, next) => { 
    const { username, celular } = req.body;
    if (!username || !celular) {
        res.status(400).json({ message: "Faltan campos obligatorios en el cuerpo de la solicitud" });
    } else {
        next(); 
    }
};
const error = ((err, req, res, next) => {
    res.status(500).json({ message: 'Algo salió mal en el servidor' });
});

module.exports =  {validarParametros , parametrosToken , error};
