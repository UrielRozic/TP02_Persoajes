import sql from 'mssql'
import config from '../../db.js'
import 'dotenv/config'

const personajeTabla = process.env.DB_TABLA_PERSONAJE;
const peliculasTabla = process.env.DB_TABLA_PELICULASERIES;
const asociarTabla = process.env.DB_TABLA_ASOCIAR;

export class personajeService{

    getPersonaje = async (nombre,edad,peso,idPeliculaSeries) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);

        if(!nombre){ 
            if(!edad){ 
                if(!peso){
                    if(!idPeliculaSeries){
                        const response5 = await pool.request()
                        .query(`SELECT * from ${personajeTabla}`);
                        console.log(response5)
                        return response5.recordset;
                    }
                    const response3 = await pool.request()
                    .input('idPeliculaSeries',sql.Int, idPeliculaSeries)
                    .query(`SELECT * from ${personajeTabla} INNER JOIN ${asociarTabla} ON personaje.id = asociar.idPeliculaSeries INNER JOIN ${peliculasTabla} ON asociar.idPeliculaSeries = peliculasSeries.id WHERE peliculasSeries.id=@idPeliculaSeries`);
                    console.log(response3)
                    return response3.recordset[0];
                }
                const response4 = await pool.request()
                    .input('peso',sql.Int, peso)
                    .query(`SELECT * from ${personajeTabla} where peso = @peso`);
                    console.log(response4)
                    return response4.recordset[0];
            }
            const response2 = await pool.request()
            .input('edad',sql.Int, edad)
            .query(`SELECT * from ${personajeTabla} where edad = @edad`);
            console.log(response2)
            return response2.recordset[0];
        }
        else {
            const response1 = await pool.request()
            .input('nombre',sql.VarChar, nombre)
            .query(`SELECT * from ${personajeTabla} where nombre = @nombre`);
            console.log(response1)
            return response1.recordset[0];
        }
        
    }

    getPersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT * from ${personajeTabla} where id = @id`);
        console.log(response)

        return response.recordset[0];
    }

    getPersonajeByIdImNo = async () => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT id.personajeTabla imagen.personajeTabla, nombre.personajeTabla from ${personajeTabla}`);
        console.log(response)

        return response.recordset[0];
    }

    getDetallePersonaje = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query (`SELECT * from ${personajeTabla} WHERE id=@id`)
        
        const detallePersonaje = await pool.request()
            .input('id',sql.Int, id)
            .query(`SELECT peliculasSeries.id, peliculasSeries.titulo, peliculasSeries.imagen, peliculasSeries.fechaCreacion, peliculasSeries.calificacion from ${personajeTabla} INNER JOIN ${asociarTabla} ON personaje.id = asociar.idPeliculaSeries INNER JOIN ${peliculasTabla} ON asociar.idPeliculaSeries = peliculasSeries.id WHERE personaje.id=@id`)
        
        console.log(response)

        response.recordset[0].peliculasSeries = detallePersonaje.recordset;

        return response.recordset[0];
    }

    createPersonaje = async (Personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('Nombre',sql.VarChar, Personaje?.nombre ?? '')
            .input('Imagen',sql.VarChar, Personaje?.imagen ?? '')
            .input('Edad',sql.Int, Personaje?.edad ?? 0)
            .input('Peso',sql.Int, Personaje?.peso ?? 0)
            .input('Historia',sql.VarChar, Personaje?.historia ?? '')
            .query(`INSERT INTO ${personajeTabla}(Nombre, Imagen, Edad, Peso, Historia) VALUES (@Nombre, @Imagen, @Edad, @Peso, @Historia)`);
        console.log(response)

        return response.recordset;
    }
    
    updatePersonajeById = async (id, Personaje) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .input('Nombre',sql.VarChar, Personaje?.nombre ?? '')
            .input('Imagen',sql.VarChar, Personaje?.imagen ?? '')
            .input('Edad',sql.Int, Personaje?.edad ?? 0)
            .input('Peso',sql.Int, Personaje?.peso ?? 0)
            .input('Historia',sql.VarChar, Personaje?.historia ?? '')
            .query(`UPDATE ${personajeTabla} SET Nombre=@Nombre, Imagen=@Imagen, Edad=@Edad, Peso=@Peso, Historia=@Historia WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }

    deletePersonajeById = async (id) => {
        console.log('This is a function on the service');

        const pool = await sql.connect(config);
        const response = await pool.request()
            .input('id',sql.Int, id)
            .query(`DELETE FROM ${personajeTabla} WHERE id = @id`);
        console.log(response)

        return response.recordset;
    }


}

//select m.* from movies where m.id =pm.movieId and p.id= pm.PersonajeId and p.id = 5
//rquest diferente:
//const persona = pool.request().query(select p.* from personajes where p.id =5
//persona.peliculas = response;
//return persona