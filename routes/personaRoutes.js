const personaController = require('../controllers/persona');

module.exports = (app) => {
    app.post('/api/persona/create', personaController.create);
    app.put('/api/persona/update', personaController.update);
    app.delete('/api/persona/delete', personaController.delete);
    app.get('/api/persona/all', personaController.findAll);
    app.get('/api/persona/find', personaController.find);
    app.get('/api/persona/findLastNroCuenta', personaController.findLastNroCuenta);
}