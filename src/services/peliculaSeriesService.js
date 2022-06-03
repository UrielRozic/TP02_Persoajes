import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const peliculasSeriesTabla = process.env.DB_TABLA_PELICULASERIES;
const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const asociarTabla = process.env.DB_TABLA_ASOCIAR;

export class peliculaSeriesService{

    getMovies = async (titulo,orden) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        if(!orden){
            if(!titulo){
            const response = await pool.request()
            .query(`SELECT peliculasSeries.id, peliculasSeries.imagen, peliculasSeries.titulo, peliculasSeries.fechaCreacion from ${peliculasSeriesTabla}`);
            console.log(response)
            return response.recordset;
            }
            const pool = await sql.connect(config);
            const response2 = await pool.request()
            .input('titulo',sql.VarChar, titulo)
            .query(`SELECT peliculasSeries.id, peliculasSeries.imagen, peliculasSeries.titulo, peliculasSeries.fechaCreacion from ${peliculasSeriesTabla} WHERE titulo = @titulo`);
            console.log(response2)
            return response2.recordset[0];
        }
        else{
            const pool = await sql.connect(config);
            const response3 = await pool.request()
            .query(`SELECT peliculasSeries.id, peliculasSeries.imagen, peliculasSeries.titulo, peliculasSeries.fechaCreacion from ${peliculasSeriesTabla} ORDER BY titulo ${orden}`);
            console.log(response3)
            return response3.recordset;
        }
    }
    getPelicula = async () => {
        console.log('This is a function on the service');
    
        const pool = await sql.connect(config);
        const response = await pool.request()
        .query(`SELECT * from ${peliculasSeriesTabla}`);
        console.log(response)
    
        return response.recordset;
    }

    getDetallePelicula = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query (`SELECT * from ${peliculasSeriesTabla} WHERE id=@id`)
        
        const detallePelicula = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT personaje.nombre from ${peliculasSeriesTabla} INNER JOIN ${asociarTabla} ON peliculasSeries.id = asociar.idPersonaje INNER JOIN ${personajeTabla} ON asociar.idPersonaje = personaje.id WHERE peliculasSeries.id=@id`)
        
        console.log(response)

        response.recordset[0].personaje = detallePelicula.recordset;

        return response.recordset[0];
    }


    
    createPelicula = async (Pelicula) => {
        console.log('This is a function on the service');
    
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Imagen',sql.VarChar, Pelicula?.imagen ?? '')
            .input('Titulo',sql.VarChar, Pelicula?.titulo ?? '')
            .input('Fecha',sql.Int, Pelicula?.fechaCreacion ?? 0)
            .input('Calificacion',sql.Int, Pelicula?.calificacion ?? 0)
            .query(`INSERT INTO ${peliculasSeriesTabla}(Imagen, Titulo, Fecha, Calificacion) VALUES (@Imagen, @Titulo, @Fecha, @Calificacion)`);
        console.log(response)
    
        return response.recordset;
    }
    
    updatePeliculaById = async (id, Pelicula) => {
        console.log('This is a function on the service');
    
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Imagen',sql.VarChar, Pelicula?.imagen ?? '')
            .input('Titulo',sql.VarChar, Pelicula?.titulo ?? '')
            .input('Fecha',sql.Int, Pelicula?.fechaCreacion ?? 0)
            .input('Calificacion',sql.Int, Pelicula?.calificacion ?? 0)
            .query(`UPDATE ${peliculasSeriesTabla} SET Imagen=@Imagen, Titulo=@Titulo, Fecha=@Fecha, Calificacion=@Calificacion WHERE id = @id`);
        console.log(response)
    
        return response.recordset;
    }
    
    deletePeliculaById = async (id) => {
        console.log('This is a function on the service');
    
        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${peliculasSeriesTabla} WHERE id = @id`);
        console.log(response)
    
        return response.recordset;
    }
}

