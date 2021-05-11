const consultaController = require('../controllers/consulta');

module.exports = (app) => {
    app.post('/api/consulta/send', consultaController.send);
}