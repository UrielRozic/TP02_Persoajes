import { Router } from 'express';
import { peliculaSeriesService } from '../services/peliculaSeriesService.js';

const router = Router();
const PeliculaSeriesService = new peliculaSeriesService();

router.get('/movies', async (req, res) => {
    console.log(`This is a get operation`);
    
    const peliculaSerie = await PeliculaSeriesService.getPelicula();
  
    return res.status(200).json(peliculaSerie);
});

router.post('', async (req, res) => {
    console.log(`This is a post operation`);
  
    const peliculaSerie = await PeliculaSeriesService.createPelicula(req.body);
  
    return res.status(201).json(peliculaSerie);
});
  
router.put('/:id',async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a put operation`);
  
    const peliculaSerie = await PeliculaSeriesService.updatePeliculaById(req.params.id,req.body);
  
    return res.status(200).json(peliculaSerie);
});
  
router.delete('/:id',Authenticate, async (req, res) => {
    console.log(`Request URL Param: ${req.params.id}`);
    console.log(`This is a delete operation`);
  
    const peliculaSerie = await PeliculaSeriesService.deletePeliculajeById(req.params.id);
  
    return res.status(200).json(peliculaSerie);
});
  
export default router;