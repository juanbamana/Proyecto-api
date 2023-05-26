
const {connection} = require("./database/connection")
const express = require("express")
const cors = require("cors")


console.log("App de node")

connection()
// crear servidor node
const app = express();
const port = 3900;
//configurar cors
app.use(cors());

//Convertir body a objeto js

app.use(express.json());
app.use(express.urlencoded({ extended:true }));
// Rutas
 const routes_article = require("./routes/articles")


 app.use("/api", routes_article)


// Crear servidor y escuchar peticiones http

app.listen(port, () => {

    console.log(`Servidor corriendo puerto ${port}`)
})