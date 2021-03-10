const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const personaCurso = require('../models').personaCurso;
const persona = require('../models').persona;
const curso = require('../models').curso;

module.exports = {
    create(req, res){
        console.info("personaCursoController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyPersonaCurso(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaCursoController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("personaCursoController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                observaciones: null
            });
        }

        personaCurso.create(verifyResponse.personaCurso)
        .then(observaciones => {
            console.info("personaCursoController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['Se ha aplicado la observación al alumno correctamente.'],
                observaciones: observaciones
            });
        })
        .catch(error => {
            console.error("personaCursoController - create - ERROR: al intentar guardar la observacion", error);
            console.info("personaCursoController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                observaciones: null
            });
        });
    },
    
    update(req, res){
        console.info("personaCursoController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyPersonaCurso(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaCursoController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("personaCursoController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                observaciones: null
            });
        }

        personaCurso.update(verifyResponse.personaCurso,{where: {id: verifyResponse.personaCurso.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("personaCursoController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['Se aplicó la observación al alumno.'],
                    observaciones: null
                }
            } else {
                console.error("personaCursoController - update - ERROR: No se pudo actualizar la observación del alumno");
                console.info("personaCursoController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la observación del alumno.'],
                    observaciones: null
                }
            }
            
            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("personaCursoController - update - ERROR: al intentar guardar la cuota", error);
            console.info("personaCursoController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                observaciones: null
            });
        });
    },
    
    delete(req, res){
        console.info("personaCursoController - delete - START");
        
        let verifyResponse = verifyHelper.verifyPersonaCurso(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaCursoController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("personaCursoController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                observaciones: null
            });
        }

        personaCurso.destroy({
            where: {id: verifyResponse.personaCurso.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("personaCursoController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La observación se ha eliminado correctamente.'],
                    observaciones: null
                };
                statusCode = 200;
            } else {
                console.error("personaCursoController - delete - ERROR: No se pudo eliminar la observación");
                console.info("personaCursoController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La inscripción no posee la observación proporcionada, no se puede eliminar.`],
                    observaciones: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("personaCursoController - delete - ERROR:  No se pudo eliminar la observación");
            console.info("personaCursoController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                    observaciones: null
              });
        })
    },
    
    findAll(req, res){
        personaCurso.findAll({ 
            include: [ {model: persona, as: 'persona'}, {model: curso, as:'curso' } ],
            order: ['id'],
            attributes:{ exclude: ['personaId', 'cursoId'] },
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
        console.info("personaCursoController - find - START");

        let verifyResponse = verifyHelper.verifyPersonaCurso(req, requestMethodAction.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaCursoController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("personaCursoController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                observaciones: null
            });
        }

        personaCurso.findAll({ 
            include: [ {model: persona, as: 'persona'}, {model: curso, as:'curso' } ],
            order: ['id'],
            attributes:{ exclude: ['personaId', 'cursoId'] },
            raw: false,
            where: verifyResponse.personaCurso
        })
        .then(observaciones => {
            console.info("personaCursoController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de observaciones encontrada.'],
               observaciones: observaciones
           });
        })
        .catch(error => {
            console.error("personaCursoController - find - ERROR: al intentar obtener listado de observaciones\n", error);
            console.info("personaCursoController - find - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Error al intentar obtener lista de observaciones.'],
                observaciones: null
            });
        })
    }
}