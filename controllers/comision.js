const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const comision = require('../models').comision;
const curso = require('../models').curso;

module.exports = {
    create(req, res){
        console.info("comisionController - create - START");
        
        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyComision(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("comisionController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("comisionController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                comisiones: null
            });
        }
        
        comision.create(verifyResponse.comision)
        .then(comision => {
            console.info("comisionController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['comisiones creado correctamente.'],
                comisiones: comision
            });
        })
        .catch(error => {
            console.error("comisionController - create - ERROR: al intentar guardar la comisión", error.original);
            console.info("comisionController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                comisiones: null
            });
        });
    },
    
    update(req, res){
        console.info("comisionController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyComision(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("comisionController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("comisionController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                comisiones: null
            });
        }

        comision.update(verifyResponse.comision,{where: {id: verifyResponse.comision.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("comisionController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['La comisión ha sido actualizada correctamente.'],
                    comisiones: null
                }
            } else {
                console.error("comisionController - update - ERROR: No se pudo actualizar la comision");
                console.info("comisionController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la comisión.'],
                    comisiones: null
                }
            }
            
            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("comisionController - update - ERROR: al intentar guardar la comisión", error);
            console.info("comisionController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                comisiones: null
            });
        });
    },
    
    delete(req, res){
        console.info("comisionController - delete - START");
        
        let verifyResponse = verifyHelper.verifyComision(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("comisionController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("comisionController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnos: null
            });
        }

        comision.destroy({
            where: {id: verifyResponse.comision.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("comisionController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La comisión ha sido eliminado correctamente.'],
                    comisiones: null
                };
                statusCode = 200;
            } else {
                console.error("comisionController - delete - ERROR: No se pudo eliminar la comision");
                console.info("comisionController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La comisión con id ${id} no existe en el sistema.`],
                    comisiones: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("comisionController - delete - ERROR: No se pudo eliminar la comision");
            console.info("comisionController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar la comisión.'],
                    comisiones: null
              });
        })
    },
    
    findAll(req, res){
        comision.findAll({ 
            include: [ {model: curso, as: 'curso'} ],
            order: ['id'],
            attributes:{ exclude: ['cursoId'] },
            raw: false
        })
        .then(comisiones => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de comisiones encontrada.'],
                comisiones: comisiones
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de comisiones', error],
            comisiones: null
        }))
    },
    
    find(req, res){
        console.info("comisionController - find - START");

        let verifyResponse = verifyHelper.verifyComision(req, requestMethodAction.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("comisionController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("comisionController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnos: null
            });
        }

        comision.findAll({ 
            include: [ {model: curso, as: 'curso'}],
            order: ['id'],
            raw: false,
            where: verifyResponse.comision
        })
        .then(comisiones => {
            console.info("comisionController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de comisiones encontrada.'],
               comisiones: comisiones
           });
        })
        .catch(error => {
            console.error("comisionController - find - ERROR: al intentar obtener listado de comisiones\n", error);
            console.info("comisionController - find - END");
            return res.status(404).send({
                exito: false,
                messages: ['Error al intentar obtener lista de comisiones'],
                comisiones: null
            });
        })
    },
}