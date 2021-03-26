const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const asistencia = require('../models').asistencia;
const personaComision = require('../models').personaComision;

module.exports = {
    create(req, res){
        console.info("asistenciaController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyAsistencia(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("asistenciaController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("asistenciaController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                asistencias: null
            });
        }

        asistencia.create(verifyResponse.asistencia)
        .then(asistencias => {
            console.info("asistenciaController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['Se ha aplicado la asistencia al alumno correctamente.'],
                asistencias: asistencias
            });
        })
        .catch(error => {
            console.error("asistenciaController - create - ERROR: al intentar guardar la asistencia", error);
            console.info("asistenciaController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                asistencias: null
            });
        });
    },
    
    update(req, res){
        console.info("asistenciaController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyAsistencia(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("asistenciaController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("asistenciaController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                asistencias: null
            });
        }

        asistencia.update(verifyResponse.asistencia,{where: {id: verifyResponse.asistencia.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("asistenciaController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['Se aplicó la asistencia al alumno.'],
                    asistencias: null
                }
            } else {
                console.error("asistenciaController - update - ERROR: No se pudo actualizar la asistencia del alumno");
                console.info("asistenciaController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la asistencia del alumno.'],
                    asistencias: null
                }
            }
            
            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("asistenciaController - update - ERROR: al intentar guardar la cuota", error);
            console.info("asistenciaController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                asistencias: null
            });
        });
    },
    
    delete(req, res){
        console.info("asistenciaController - delete - START");
        
        let verifyResponse = verifyHelper.verifyAsistencia(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("asistenciaController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("asistenciaController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                asistencias: null
            });
        }

        asistencia.destroy({
            where: {id: verifyResponse.asistencia.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("asistenciaController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La asistencia se ha eliminado correctamente.'],
                    asistencias: null
                };
                statusCode = 200;
            } else {
                console.error("asistenciaController - delete - ERROR: No se pudo eliminar la asistencia");
                console.info("asistenciaController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La inscripción no posee la asistencia proporcionada, no se puede eliminar.`],
                    asistencias: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("asistenciaController - delete - ERROR:  No se pudo eliminar la asistencia");
            console.info("asistenciaController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                    asistencias: null
              });
        })
    },
    
    findAll(req, res){
        asistencia.findAll({ 
            include: [ {model: personaComision, as: 'comision'} ],
            order: ['id'],
            attributes:{ exclude: ['personaComisionId'] },
            raw: false
        })
        .then(asistencias => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de asistencias encontrada.'],
                asistencias: asistencias
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Error al intentar obtener lista de asistencia.'],
            asistencias: null
        }));
    },
    
    find(req, res){
        console.info("asistenciaController - find - START");

        let verifyResponse = verifyHelper.verifyAsistencia(req, requestMethodAction.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("asistenciaController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("asistenciaController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                asistencias: null
            });
        }

        asistencia.findAll({ 
            include: [ {model: personaComision, as: 'comision'} ],
            order: ['id'],
            attributes:{ exclude: ['personaComisionId'] },
            raw: false,
            where: verifyResponse.asistencia
        })
        .then(asistencias => {
            console.info("asistenciaController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de asistencias encontrada.'],
               asistencias: asistencias
           });
        })
        .catch(error => {
            console.error("asistenciaController - find - ERROR: al intentar obtener listado de asistencias\n", error);
            console.info("asistenciaController - find - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Error al intentar obtener lista de asistencias.'],
                asistencias: null
            });
        })
    },
}