const asistenciaController = require('../controllers/asistencia');

module.exports = (app) => {
    app.post('/api/asistencia/create', asistenciaController.create);
    app.put('/api/asistencia/update', asistenciaController.update);
    app.delete('/api/asistencia/delete', asistenciaController.delete);
    app.get('/api/asistencia/all', asistenciaController.findAll);
    app.get('/api/asistencia/find', asistenciaController.find);
}