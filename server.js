import express from "express";
import cors from "cors";
import PersonajeRouter from "./src/controllers/personajeController.js";
import TokenRouter from "./src/controllers/tokenController.js";
import PeliculasRouter from "./src/controllers/peliculaSeriesController.js";

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.use("/personaje", PersonajeRouter);
app.use("/auth", TokenRouter);
app.use("/pelicula", PeliculasRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
