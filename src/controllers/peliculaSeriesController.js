import { Router } from 'express';
import { peliculaSeriesService } from '../services/peliculaSeriesService.js';
import { Authenticate } from '../common/jwt.js';

const router = Router();
const PeliculaSeriesService = new peliculaSeriesService();

router.get('/movies',Authenticate, async (req, res) => {
    console.log(`This is a get operation`);

    let titulo=req.query.titulo
    let orden=req.query.orden
    
    const peliculaSerie = await PeliculaSeriesService.getMovies(titulo,orden);
  
    return res.status(200).json(peliculaSerie);
});

router.get('',Authenticate, async (req, res) => {
    console.log(`This is a get operation`);
    
    const peliculaSerie = await PeliculaSeriesService.getPelicula();
  
    return res.status(200).json(peliculaSerie);
});

router.get('/detallePelicula/:id',Authenticate, async (req, res) => {
    console.log(`This is a get operation`);
    
    const peliculaSerie = await PeliculaSeriesService.getDetallePelicula(req.params.id);
  
    return res.status(200).json(peliculaSerie);
});

router.post('',Authenticate, async (req, res) => {
    console.log(`This is a post operation`);
  
    const peliculaSerie = await PeliculaSeriesService.createPelicula(req.body);
  
    return res.status(201).json(peliculaSerie);
});
  
router.put('/:id',Authenticate,async (req, res) => {
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