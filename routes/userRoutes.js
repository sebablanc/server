const userController = require('../controllers/user');

module.exports = (app) => {
    app.post('/api/user/register', userController.create);
    app.put('/api/user/update', userController.update);
    app.delete('/api/user/delete', userController.delete);
    app.get('/api/user/all', userController.findAll);
    app.get('/api/user/find', userController.find);
    app.get('/api/user/login', userController.login);
}