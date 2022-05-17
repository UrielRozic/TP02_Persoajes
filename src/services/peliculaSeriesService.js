import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const peliculaTabla = process.env.DB_TABLA_PELICULASERIES;

export class peliculaSeriesService{
    getPeliculas = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
        .query(`SELECT peliculasSeries.id, peliculasSeries.imagen, peliculasSeries.titulo, peliculasSeries.fechaCreacion from ${peliculasSeriesTabla}`);
        console.log(response)
    
        return response.recordset[0];
    }
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