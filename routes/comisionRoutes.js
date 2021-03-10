const comisionController = require('../controllers/comision');

module.exports = (app) => {
    app.post('/api/comision/create', comisionController.create);
    app.put('/api/comision/update', comisionController.update);
    app.delete('/api/comision/delete', comisionController.delete);
    app.get('/api/comision/all', comisionController.findAll);
    app.get('/api/comision/find', comisionController.find);
}