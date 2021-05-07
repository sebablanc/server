const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const premio = require('../models').premio;

module.exports = {
    create(req, res){
        console.info("premioController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyPremio(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("premioController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("premioController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                premios: null
            });
        }

        premio.create(verifyResponse.premio)
        .then(premios => {
            console.info("premioController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['Se ha guardado el sorteo correctamente.'],
                premios: premios
            });
        })
        .catch(error => {
            console.error("premioController - create - ERROR: al intentar guardar el sorteo", error);
            console.info("premioController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                premios: null
            });
        });
    },

    findAll(req, res){
        premio.findAll({
            order: ['id'],
            raw: false,
        })
        .then(premios => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de premios encontrada.'],
                premios: premios
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de premios', error],
            premios: null
        }))
    },

    update(req, res){
        console.info("premioController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyPremio(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("premioController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("premioController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                premios: null
            });
        }

        premio.update(verifyResponse.premio,{where: {id: verifyResponse.premio.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("premioController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['El premio ha sido actualizada correctamente.'],
                    premios: null
                }
            } else {
                console.error("premioController - update - ERROR: No se pudo actualizar el premio");
                console.info("premioController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar el premio.'],
                    premios: null
                }
            }
            
            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("premioController - update - ERROR: al intentar guardar el premio", error);
            console.info("premioController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                premios: null
            });
        });
    },
}