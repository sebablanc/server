const cursoController = require('../controllers/curso');

module.exports = (app) => {
    app.post('/api/curso/create', cursoController.create);
    app.put('/api/curso/update', cursoController.update);
    app.delete('/api/curso/delete', cursoController.delete);
    app.get('/api/curso/all', cursoController.findAll);
    app.get('/api/curso/find', cursoController.find);
}