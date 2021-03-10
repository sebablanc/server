const alumnoComisionController = require('../controllers/alumnoComision');

module.exports = (app) => {
    app.post('/api/alumnoComision/create', alumnoComisionController.create);
    app.put('/api/alumnoComision/update', alumnoComisionController.update);
    app.delete('/api/alumnoComision/delete', alumnoComisionController.delete);
    app.get('/api/alumnoComision/all', alumnoComisionController.findAll);
    app.get('/api/alumnoComision/find', alumnoComisionController.find);
}