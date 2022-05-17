import { Router } from 'express';
import { autenticarService } from '../services/autenticarService.js';

const router = Router();
const AutenticarService = new autenticarService();

router.get('/login', async (req, res) => {
    console.log(`This is a get operation`);
    
    const autenticar = autenticarService.getSignedToken();
  
    return res.status(200).json(autenticar);
  });