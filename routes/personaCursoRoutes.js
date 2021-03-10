const personaCursoController = require('../controllers/personaCurso');

module.exports = (app) => {
    app.post('/api/personaCurso/create', personaCursoController.create);
    app.put('/api/personaCurso/update', personaCursoController.update);
    app.delete('/api/personaCurso/delete', personaCursoController.delete);
    app.get('/api/personaCurso/all', personaCursoController.findAll);
    app.get('/api/personaCurso/find', personaCursoController.find);
}