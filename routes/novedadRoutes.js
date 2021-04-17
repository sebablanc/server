const novedadController = require('../controllers/novedad');

module.exports = (app) => {
    app.post('/api/novedad/create', novedadController.create);
    /*app.put('/api/novedad/update', novedadController.update);
    app.post('/api/novedad/delete', novedadController.delete);
    app.get('/api/novedad/all', novedadController.findAll);
    app.post('/api/novedad/find', novedadController.find);*/
}