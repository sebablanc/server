const comisionController = require('../controllers/comision');

module.exports = (app) => {
    app.post('/api/comision/create', comisionController.create);
    app.put('/api/comision/update', comisionController.update);
    app.post('/api/comision/delete', comisionController.delete);
    app.get('/api/comision/all', comisionController.findAll);
    app.post('/api/comision/find', comisionController.find);
}