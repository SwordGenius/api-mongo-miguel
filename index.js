const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
require('./src/configs/db.config').mongo().then(() => { console.log("conectado a mongodb exitosamente") })
    .catch(console.log);

const usuariosRouter = require('./src/routes/usuario.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios', usuariosRouter);

const port = process.env.PORT;

app.listen(port ||3000, () => {
    console.log("API escuchando en el puerto "+ port);
});