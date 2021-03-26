const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const personaComision = require('../models').personaComision;
const persona = require('../models').persona;
const comision = require('../models').comision;
const cuota = require('../models').cuota;
const asistencia = require('../models').asistencia;

module.exports = {
    create(req, res){
        console.info("personaComisionController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyPersonaComision(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaComisionController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("personaComisionController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                personasComisiones: null
            });
        }

        personaComision.create(verifyResponse.personaComision)
        .then(personaComision => {
            console.info("personaComisionController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['Inscripción de persona a comisión creada correctamente.'],
                personasComisiones: personaComision
            });
        })
        .catch(error => {
            console.error("personaComisionController - create - ERROR: al intentar guardar la comisión", error.original);
            console.info("personaComisionController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                personasComisiones: null
            });
        });
    },

    update(req, res){
        console.info("personaComisionController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyPersonaComision(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaComisionController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("personaComisionController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                personasComisiones: null
            });
        }

        personaComision.update(verifyResponse.personaComision,{where: {id: verifyResponse.personaComision.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("personaComisionController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['La inscripción ha sido actualizada correctamente.'],
                    personasComisiones: null
                }
            } else {
                console.error("personaComisionController - update - ERROR: No se pudo actualizar la inscripción");
                console.info("personaComisionController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la inscripción.'],
                    personasComisiones: null
                }
            }
            
            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("personaComisionController - update - ERROR: al intentar guardar la inscripción", error);
            console.info("personaComisionController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                personasComisiones: null
            });
        });
    },
    
    delete(req, res){
        console.info("personaComisionController - delete - START");
        
        let verifyResponse = verifyHelper.verifyPersonaComision(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaComisionController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("personaComisionController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                personasComisiones: null
            });
        }

        personaComision.destroy({
            where: {id: verifyResponse.personaComision.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("personaComisionController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La inscripción ha sido eliminada correctamente.'],
                    personasComisiones: null
                };
                statusCode = 200;
            } else {
                console.error("personaComisionController - delete - ERROR: No se pudo eliminar la inscripción");
                console.info("personaComisionController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La inscripción con id ${id} no existe en el sistema.`],
                    personasComisiones: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("personaComisionController - delete - ERROR: No se pudo eliminar la inscripción");
            console.info("personaComisionController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar la inscripción.'],
                    personasComisiones: null
              });
        })
    },
    
    findAll(req, res){
        personaComision.findAll({ 
            include: [ {model:persona, as: 'persona'}, {model: comision, as: 'comision'}, {model: asistencia, as: 'asistencias'} ],
            order: ['id'],
            attributes:{ exclude: ['personaId', 'comisinoId'] },
            raw: false
        })
        .then(personasComisiones => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de inscripciones encontradas.'],
                personasComisiones: personasComisiones
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de inscripciones', error],
            personasComisiones: null
        }))
    },
    
    find(req, res){
        console.info("personaComisionController - find - START");

        let verifyResponse = verifyHelper.verifyPersonaComision(req, requestMethodAction.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaComisionController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("personaComisionController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                personasComisiones: null
            });
        }

        personaComision.findAll({ 
            include: [ {model:persona, as: 'persona'}, {model: comision, as: 'comision'}, {model: cuota, as: 'cuotas'} ],
            order: ['id'],
            attributes:{ exclude: ['personaId', 'comisionId'] },
            raw: false,
            where: verifyResponse.personaComision
        })
        .then(personasComisiones => {
            console.info("personaComisionController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de comisiones encontrada.'],
               personasComisiones: personasComisiones
           });
        })
        .catch(error => {
            console.error("personaComisionController - find - ERROR: al intentar obtener listado de inscripciones\n", error);
            console.info("personaComisionController - find - END");
            return res.status(404).send({
                exito: false,
                messages: ['Error al intentar obtener lista de inscripciones'],
                personasComisiones: null
            });
        })
    }
}