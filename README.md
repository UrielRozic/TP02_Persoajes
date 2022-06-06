1) En primer lugar debemos instalar todas las dependencias necesarias para el correcto funcionamiento del programa. Esto lo hacemos mediante el comando, en la terminal, npm Install.

2) En segundo lugar debemos crear un archivo .env dentro de la carpeta del trabajo y colocar toda la información que está en el block de notas.

3) En tercer lugar tenemos que copiar el contenido de los archivos SQL que tenemos en la carpeta y pegarlos en un script del programa SQL Server Managment y apretar execute para que se cree la base de datos.

4) En cuarto lugar necesitamos generar un Token para poder probar los diferentes endPoints. Para hacer esto debemos abrir Postman, crear una nueva coleción y pasar por la URL localhost//:5000/auth/login

5)En quinto lugar, para probar cada consigna hay que usar diferentes endpoints, si es para algo de algun personaje es /personaje, si es para algo de una pelicula o serie es /pelicula y si es para el token es /auth/login
