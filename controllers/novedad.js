const novedad = require('../models').novedad;
const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;

module.exports = {

    create(req, res){
        console.info("novedadController - create - START");
        let verifyResponse = verifyHelper.verifyNovedad(req, requestMethodAction.CREATE);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un curso
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("novedadController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("novedadController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                novedades: null
            });
        }

        novedad.create(verifyResponse.novedad)
        .then(novedades => {
            console.info("novedadController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['novedad creada correctamente.'],
                novedades: novedades
            });
        })
        .catch(error => {
            console.error("novedadController - create - ERROR: al intentar guardar la novedad", error);
            console.info("novedadController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                novedades: null
            });
        });
    },

    update(req, res){
        console.info("novedadController - update - START");

        console.log(req.body);
        let verifyResponse = verifyHelper.verifyNovedad(req, requestMethodAction.UPDATE);
        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un novedad
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("novedadController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("novedadController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                novedades: null
            });
        }

        novedad.update(verifyResponse.novedad,{where: {id: verifyResponse.novedad.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("novedadController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['La novedad ha sido actualizado correctamente.'],
                    novedades: null
                }
            } else {
                console.error("novedadController - update - ERROR: No se pudo actualizar la novedad");
                console.info("novedadController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la novedad.'],
                    novedades: null
                }
            }

            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("novedadController - update - ERROR: al intentar guardar la novedad", error);
            console.info("novedadController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                novedades: null
            });
        });
    },

    delete(req, res){
        console.info("novedadController - delete - START");
        
        let verifyResponse = verifyHelper.verifyNovedad(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("novedadController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("novedadController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                novedades: null
            });
        }

        novedad.destroy({
            where: {id: verifyResponse.novedad.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("novedadController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La novedad ha sido eliminado correctamente.'],
                    novedades: null
                };
                statusCode = 200;
            } else {
                console.error("novedadController - delete - ERROR: No se pudo eliminar la novedad");
                console.info("novedadController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La novedad con id ${id} no existe en el sistema.`],
                    novedades: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("novedadController - delete - ERROR: No se pudo eliminar la novedad");
            console.info("novedadController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar la novedad.'],
                    novedades: null
              });
        })
    },

    findAll(req, res){
        novedad.findAll({
            order: ['id'],
            raw: false,
        })
        .then(novedades => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de novedades encontrada.'],
                novedades: novedades
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de novedades', error],
            novedades: null
        }))
    },
}