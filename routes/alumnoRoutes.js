const alumnoController = require('../controllers/alumno');

module.exports = (app) => {
    app.post('/api/alumno/create', alumnoController.create);
    app.put('/api/alumno/update', alumnoController.update);
    app.delete('/api/alumno/delete', alumnoController.delete);
    app.get('/api/alumno/all', alumnoController.findAll);
    app.get('/api/alumno/find', alumnoController.find);
}