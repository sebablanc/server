const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const alumnoComision = require('../models').alumnoComision;
const alumno = require('../models').alumno;
const comision = require('../models').comision;
const cuota = require('../models').cuota;
const asistencia = require('../models').asistencia;

module.exports = {
    create(req, res){
        console.info("alumnoComisionController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyAlumnoComision(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("alumnoComisionController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("alumnoComisionController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnosComisiones: null
            });
        }

        alumnoComision.create(verifyResponse.alumnoComision)
        .then(alumnoComision => {
            console.info("alumnoComisionController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['Inscripción de alumno a comisión creada correctamente.'],
                alumnosComisiones: alumnoComision
            });
        })
        .catch(error => {
            console.error("alumnoComisionController - create - ERROR: al intentar guardar la comisión", error.original);
            console.info("alumnoComisionController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                alumnosComisiones: null
            });
        });
    },

    update(req, res){
        console.info("alumnoComisionController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyAlumnoComision(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("alumnoComisionController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("alumnoComisionController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnosComisiones: null
            });
        }

        alumnoComision.update(verifyResponse.alumnoComision,{where: {id: verifyResponse.alumnoComision.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("alumnoComisionController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['La inscripción ha sido actualizada correctamente.'],
                    alumnosComisiones: null
                }
            } else {
                console.error("alumnoComisionController - update - ERROR: No se pudo actualizar la inscripción");
                console.info("alumnoComisionController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la inscripción.'],
                    alumnosComisiones: null
                }
            }
            
            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("alumnoComisionController - update - ERROR: al intentar guardar la inscripción", error);
            console.info("alumnoComisionController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                alumnosComisiones: null
            });
        });
    },
    
    delete(req, res){
        console.info("alumnoComisionController - delete - START");
        
        let verifyResponse = verifyHelper.verifyAlumnoComision(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("alumnoComisionController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("alumnoComisionController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnosComisiones: null
            });
        }

        alumnoComision.destroy({
            where: {id: verifyResponse.alumnoComision.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("alumnoComisionController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La inscripción ha sido eliminada correctamente.'],
                    alumnosComisiones: null
                };
                statusCode = 200;
            } else {
                console.error("alumnoComisionController - delete - ERROR: No se pudo eliminar la inscripción");
                console.info("alumnoComisionController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La inscripción con id ${id} no existe en el sistema.`],
                    alumnosComisiones: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("alumnoComisionController - delete - ERROR: No se pudo eliminar la inscripción");
            console.info("alumnoComisionController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar la inscripción.'],
                    alumnosComisiones: null
              });
        })
    },
    
    findAll(req, res){
        alumnoComision.findAll({ 
            include: [ {model:alumno, as: 'alumno'}, {model: comision, as: 'comision'}, {model: asistencia, as: 'asistencias'} ],
            order: ['id'],
            attributes:{ exclude: ['alumnoId', 'comisinoId'] },
            raw: false
        })
        .then(alumnosComisiones => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de inscripciones encontradas.'],
                alumnosComisiones: alumnosComisiones
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de inscripciones', error],
            alumnosComisiones: null
        }))
    },
    
    find(req, res){
        console.info("alumnoComisionController - find - START");

        let verifyResponse = verifyHelper.verifyAlumnoComision(req, requestMethodAction.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("alumnoComisionController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("alumnoComisionController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnosComisiones: null
            });
        }

        alumnoComision.findAll({ 
            include: [ {model:alumno, as: 'alumno'}, {model: comision, as: 'comision'}, {model: cuota, as: 'cuotas'} ],
            order: ['id'],
            attributes:{ exclude: ['alumnoId', 'comisionId'] },
            raw: false,
            where: verifyResponse.alumnoComision
        })
        .then(alumnosComisiones => {
            console.info("alumnoComisionController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de comisiones encontrada.'],
               alumnosComisiones: alumnosComisiones
           });
        })
        .catch(error => {
            console.error("alumnoComisionController - find - ERROR: al intentar obtener listado de inscripciones\n", error);
            console.info("alumnoComisionController - find - END");
            return res.status(404).send({
                exito: false,
                messages: ['Error al intentar obtener lista de inscripciones'],
                alumnosComisiones: null
            });
        })
    }
}