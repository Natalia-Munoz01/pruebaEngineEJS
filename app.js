const express = require('express')
const app = express()
const path = require('path')


app.set("PORT", process.env.PORT || 3000);


app.listen(app.get("PORT"), () =>
    console.log(`Server listen at Port ${app.get("PORT")}`)
);


// Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')


// Middlewares
app.use(express.urlencoded({extended: false}))


// Routes
app.use(require('./routes/index'))

module.exports = app


const fs = require('fs');

// Configuramos EJS
app.set('view engine', 'ejs');

// Ruta principal que carga los productos
app.get('/', (req, res) => {
    // Leer el archivo JSON de manera asíncrona
    fs.readFile(path.join(__dirname, 'data.json'), 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer los productos');
        }

        const productos = JSON.parse(data);
        res.render('index', { productos });
    });
});

