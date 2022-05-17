import { Router } from 'express';
import { personajeService } from '../services/personajeService.js';
import { Authenticate } from '../common/jwt.js';

const router = Router();
const PersonajeService = new personajeService();

router.get('/', Authenticate, async (req, res) => {
    console.log(`This is a get operation`);
    
    const personaje = await PersonajeService.getPersonaje(req.query.nombre,req.query.edad);
  
    return res.status(200).json(personaje);
  });
  
  router.get('/:id',Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);
  
    const personaje = await PersonajeService.getPersonajeById(req.params.id);
  
    return res.status(200).json(personaje);
  });
  router.get('/characters',Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a get operation`);
  
    const personaje = await PersonajeService.getPersonajeByIdImNo(req.params.id);
  
    return res.status(200).json(personaje);
  });


  
  
  router.post('',Authenticate, async (req, res) => {
    console.log(`This is a post operation`);
  
    const personaje = await PersonajeService.createPersonaje(req.body);
  
    return res.status(201).json(personaje);
  });
  
  router.put('/:id', Authenticate,async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);
  
    const personaje = await PersonajeService.updatePersonajeById(req.params.id, req.body);
  
    return res.status(200).json(personaje);
  });
  
  router.delete('/:id',Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);
  
    const personaje = await PersonajeService.deletePersonajeById(req.params.id);
  
    return res.status(200).json(personaje);
  });
  
  export default router;