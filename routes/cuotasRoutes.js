const cuotasController = require('../controllers/cuota');

module.exports = (app) => {
    app.post('/api/cuota/create', cuotasController.create);
    app.put('/api/cuota/update', cuotasController.update);
    app.delete('/api/cuota/delete', cuotasController.delete);
    app.get('/api/cuota/all', cuotasController.findAll);
    app.get('/api/cuota/find', cuotasController.find);
}