const premioController = require('../controllers/premio');

module.exports = (app) => {
    app.post('/api/premio/create', premioController.create);
    /*app.put('/api/premio/update', premioController.update);
    app.post('/api/premio/delete', premioController.delete);
    app.get('/api/premio/all', premioController.findAll);
    app.post('/api/premio/find', premioController.find);*/
}