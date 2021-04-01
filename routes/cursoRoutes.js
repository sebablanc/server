const cursoController = require('../controllers/curso');

module.exports = (app) => {
    app.post('/api/curso/create', cursoController.create);
    app.put('/api/curso/update', cursoController.update);
    app.post('/api/curso/delete', cursoController.delete);
    app.get('/api/curso/all', cursoController.findAll);
    app.post('/api/curso/find', cursoController.find);
}