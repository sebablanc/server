const inscripcionDescuentoController = require('../controllers/inscripcionDescuento');

module.exports = (app) => {
    app.post('/api/inscripcionDescuento/create', inscripcionDescuentoController.create);
    app.put('/api/inscripcionDescuento/update', inscripcionDescuentoController.update);
    app.delete('/api/inscripcionDescuento/delete', inscripcionDescuentoController.delete);
    app.get('/api/inscripcionDescuento/all', inscripcionDescuentoController.findAll);
    app.get('/api/inscripcionDescuento/find', inscripcionDescuentoController.find);
}