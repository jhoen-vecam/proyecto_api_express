const express = require("express");
const jwt = require ("jsonwebtoken")
const router = express.Router();
const { error } = require("../middlewares/routers");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

router.use(express.json());

const autenticaciónToken = (req, res, next) => {
    try { 
        const  {username , celular}= req.body
    if (!username || !celular){
      return   res.status(400).json({message : "parametros incorrectos"});        
    } else 
    {const token = jwt.sign(user , JWT_SECRET);
    
    res.status(200).json(token)
    
    }

    } catch (error) {
        next(error)
    }
}
const verificacionToken = (req, res, next) => {
    try {
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ message: 'Token de autenticación no proporcionado' });
      }
  
      const user = jwt.verify(token, JWT_SECRET);
      req.user = user;
      next();
    } catch (error) {
      if (error.name === 'JsonWebTokenError') {
        return res.status(403).json({ message: 'Token de autenticación inválido' });
      }
      next(error);
    }
  };
  router.use(verificacionToken);
  router.use(error); 

    module.exports = {verificacionToken , autenticaciónToken , router};