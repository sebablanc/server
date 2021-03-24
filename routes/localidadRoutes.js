const localidadController = require('../controllers/localidad');

module.exports = (app) => {
    app.post('/api/localidad/create', localidadController.create);
    app.put('/api/localidad/update', localidadController.update);
    app.delete('/api/localidad/delete', localidadController.delete);
    app.get('/api/localidad/all', localidadController.findAll);
    app.post('/api/localidad/find', localidadController.find);
}