const express    = require('express');
const logger     = require('morgan');
const bodyParser = require('body-parser');
const http       = require('http');

// Creando app express;
const app = express();

// Log para las peticiones
app.use(logger('dev'));

// Parseador de data en las peticiones
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// rutas
require('./routes/localidadRoutes')(app);
require('./routes/personaRoutes')(app);
require('./routes/userRoutes')(app);
require('./routes/descuentoRoutes')(app);
require('./routes/cursoRoutes')(app);
require('./routes/alumnoRoutes')(app);
require('./routes/comisionRoutes')(app);
require('./routes/alumnoComisionRoutes')(app);
require('./routes/cuotasRoutes')(app);
require('./routes/inscripcionDescuentoRoutes')(app);
require('./routes/asistenciaRoutes')(app);
require('./routes/personaCursoRoutes')(app);

// seteando puerto
const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

//creando server
const server = http.createServer(app);
server.listen(port);

// exponiendo la app
module.exports = app;