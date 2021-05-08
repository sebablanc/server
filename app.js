const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const http       = require('http');
const cors = require('cors');

// Creando app express;
const app = express();

// Log para las peticiones
app.use(logger('dev'));

app.use(express.static('public'));  
app.use('/images', express.static('images')); 

// Parseador de data en las peticiones
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(cors());

// rutas
require('./routes/localidadRoutes')(app);
require('./routes/personaRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/descuentoRoutes')(app);
require('./routes/cursoRoutes')(app);
require('./routes/comisionRoutes')(app);
require('./routes/personaComisionRoutes')(app);
require('./routes/cuotasRoutes')(app);
require('./routes/inscripcionDescuentoRoutes')(app);
require('./routes/asistenciaRoutes')(app);
require('./routes/personaCursoRoutes')(app);
require('./routes/novedadRoutes')(app);
require('./routes/premioRoutes')(app);

// seteando puerto
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

//creando server
const server = http.createServer(app);
server.listen(port);

// exponiendo la app
module.exports = app;