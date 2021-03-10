const descuentoController = require('../controllers/descuento');

module.exports = (app) => {
    app.post('/api/descuento/create', descuentoController.create);
    app.put('/api/descuento/update', descuentoController.update);
    app.delete('/api/descuento/delete', descuentoController.delete);
    app.get('/api/descuento/all', descuentoController.findAll);
    app.get('/api/descuento/find', descuentoController.find);
}