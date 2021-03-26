const personaComisionController = require('../controllers/personaComision');

module.exports = (app) => {
    app.post('/api/personaComision/create', personaComisionController.create);
    app.put('/api/personaComision/update', personaComisionController.update);
    app.delete('/api/personaComision/delete', personaComisionController.delete);
    app.get('/api/personaComision/all', personaComisionController.findAll);
    app.get('/api/personaComision/find', personaComisionController.find);
}