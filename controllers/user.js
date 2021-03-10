const {QueryTypes} = require('sequelize');
const db = require('../models/index');
const user = require('../models').user;
const persona = require('../models').persona;
const emailSend = require('./sendEmail');
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const userActions = require('../helpers/constant-helpers').REQUEST_METHODS_ACTION;
const userHelper = require('../helpers/verify-helper').verifyHelper;

module.exports = {
    create(req, res){
        console.info("userController - create - START");

        let verifyResponse = userHelper.verifyUser(req, userActions.CREATE);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un usuario
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("userController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("userController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                usuarios: null
            });
        }

        user.create(verifyResponse.user, {attributes:{ exclude: ['pass'] },})
        .then(user => {
            console.info("userController - create - END");
            
            // habilitar cuando este correctamente implementado el mail de verificación
            //let emailSended = emailSend.sendEmail(user.email, 'Verificación', 'Este es el mensaje de verificación');
            return res.status(200).send({
                exito: true,
                messages: ['usuario creado correctamente. Se ha enviado un mail de verificación'],
                usuarios: user
            });
        })
        .catch(error => {
            console.error("userController - create - ERROR: al intentar guardar el usuario", error.original.code);
            console.info("userController - create - END");
            console.log(error);
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                usuarios: null
            });
        });
    },
    
    update(req, res){
        console.info("userController - update - START");
        
        let verifyResponse = userHelper.verifyUser(req, userActions.UPDATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("userController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("userController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                usuarios: null
            });
        }

        console.log(verifyResponse);

        user.update(verifyResponse.user, {where: {id: verifyResponse.user.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("userController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['El usuario ha sido actualizado correctamente.'],
                    usuarios: null
                }
            } else {
                console.error("userController - update - ERROR: No se pudo actualizar el usuario");
                console.info("userController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar el usuario.'],
                    usuarios: null
                }
            }

            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.log(error);
            res.status(404).send({
            exito: false,
            messages:  [error && error.original && error.original.code ? errors[error.original.code] : 'Ocurrió un error al intentar actualizar sus datos.'],
            usuarios: null
        })})
    },
    
    delete(req, res){
        console.info("userController - delete - START");
        
        let verifyResponse = userHelper.verifyUser(req, userActions.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("userController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("userController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                usuarios: null
            });
        }

        user.destroy({
            where: {id: verifyResponse.user.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("userController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['El usuario ha sido eliminado correctamente.'],
                    usuarios: null
                };
                statusCode = 200;
            } else {
                console.error("userController - delete - ERROR: No se pudo eliminar el usuario");
                console.info("userController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`El usuario con id ${id} no existe en el sistema.`],
                    usuarios: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("userController - delete - ERROR: No se pudo eliminar el usuario");
            console.info("userController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar el usuario.'],
                    usuarios: null
              });
        })
    },
    
    findAll(req, res){
        //TODO: es necesario?
    },

    login(req, res){
        
        let email = req.body && req.body.email && req.body.email.trim() != '' ? req.body.email.trim() : null;
        let pass = req.body && req.body.pass && req.body.pass.trim() != '' ? req.body.pass.trim() : null;

        if(email == null || pass == null){
            console.error("userController - login - ERROR: faltan parámetros", req.body);
            console.info("userController - login - END");
            return res.status(400).send({
                exito: false,
                messages: ['usuario o contraseña incorrectos'],
                usuarios: null
            });
        }
        
        db.sequelize.query(`SELECT * FROM loginUser(:email, :pass)`, {replacements: { email: email, pass: pass }, type: QueryTypes.SELECT})
        .then(async usuarios => {
            let personaEncontrada = null;
            if(usuarios.length > 0){
                usuarios.forEach( usuario => {
                    delete usuario.pass;
                });
                personaEncontrada = await user.findAll({include: [ {model: persona, as: 'persona'}], attributes:{ exclude: ['pass'] }, where: {id: usuarios[0].id},});
            }
            return res.status(200).send({
               exito: true,
               messages: ['Lista de usuarios encontrada.'],
               usuarios: personaEncontrada ? personaEncontrada : usuarios
           });
        })
        .catch(error => {
            console.error("userController - find - ERROR: al intentar obtener listado de usuarios\n", error);
            console.info("userController - find - END");
            return res.status(404).send({
                exito: false,
                messages: ['Error al intentar obtener lista de usuarios'],
                usuarios: null
            });
        });
    },
    
    find(req, res){
        console.info("userController - find - START");

        let verifyResponse = userHelper.verifyUser(req, userActions.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("userController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("userController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                usuarios: null
            });
        }

        user.findAll({ 
            include: [ {model: persona, as: 'persona'}],
            attributes:{ exclude: ['pass'] },
            raw: false,
            where: verifyResponse.user
        })
        .then(usuarios => {
            console.info("userController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de usuarios encontrada.'],
               usuarios: usuarios
           });
        })
        .catch(error => {
            console.error("userController - find - ERROR: al intentar obtener listado de usuarios\n", error);
            console.info("userController - find - END");
            return res.status(404).send({
                exito: false,
                messages: ['Error al intentar obtener lista de usuarios'],
                usuarios: null
            });
        })
    }
}