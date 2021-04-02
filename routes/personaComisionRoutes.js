const personaComisionController = require('../controllers/personaComision');

module.exports = (app) => {
    app.post('/api/personaComision/create', personaComisionController.create);
    app.put('/api/personaComision/update', personaComisionController.update);
    app.post('/api/personaComision/delete', personaComisionController.delete);
    app.get('/api/personaComision/all', personaComisionController.findAll);
    app.post('/api/personaComision/find', personaComisionController.find);
}