const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const cuota = require('../models').cuota;
const personaComision = require('../models').personaComision;

module.exports = {
    create(req, res){
        console.info("cuotaController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyCuota(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("cuotaController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("cuotaController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                cuotas: null
            });
        }

        cuota.create(verifyResponse.cuota)
        .then(cuotas => {
            console.info("cuotaController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['Cuota guardada correctamente.'],
                cuotas: cuotas
            });
        })
        .catch(error => {
            console.error("cuotaController - create - ERROR: al intentar guardar la cuota", error);
            console.info("cuotaController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                cuotas: null
            });
        });
    },
    
    update(req, res){
        console.info("cuotaController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyCuota(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("cuotaController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("cuotaController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                cuotas: null
            });
        }

        cuota.update(verifyResponse.cuota,{where: {id: verifyResponse.cuota.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("cuotaController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['La cuota ha sido actualizada correctamente.'],
                    cuotas: null
                }
            } else {
                console.error("cuotaController - update - ERROR: No se pudo actualizar la cuota");
                console.info("cuotaController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la cuota.'],
                    cuotas: null
                }
            }
            
            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("cuotaController - update - ERROR: al intentar guardar la cuota", error);
            console.info("cuotaController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                cuotas: null
            });
        });
    },
    
    delete(req, res){
        console.info("cuotaController - delete - START");
        
        let verifyResponse = verifyHelper.verifyCuota(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("cuotaController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("cuotaController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                cuotas: null
            });
        }

        cuota.destroy({
            where: {id: verifyResponse.cuota.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("cuotaController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La cuota ha sido eliminada correctamente.'],
                    cuotas: null
                };
                statusCode = 200;
            } else {
                console.error("cuotaController - delete - ERROR: No se pudo eliminar la cuota");
                console.info("cuotaController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La cuota con id ${id} no existe en el sistema.`],
                    cuotas: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("cuotaController - delete - ERROR: No se pudo eliminar la cuota");
            console.info("cuotaController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                    cuotas: null
              });
        })
    },
    
    findAll(req, res){
        cuota.findAll({ 
            include: [ {model: personaComision, as: 'inscripcion'} ],
            order: ['id'],
            attributes:{ exclude: ['personaComisionId'] },
            raw: false
        })
        .then(cuotas => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de cuotas encontradas.'],
                cuotas: cuotas
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Error al intentar obtener lista de cuota.'],
            cuotas: null
        }));
    },
    
    find(req, res){
        console.info("cuotaController - find - START");

        let verifyResponse = verifyHelper.verifyCuota(req, requestMethodAction.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("cuotaController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("cuotaController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                cuotas: null
            });
        }

        cuota.findAll({ 
            include: [ {model: personaComision, as: 'inscripcion'} ],
            order: ['id'],
            attributes:{ exclude: ['personaComisionId'] },
            raw: false,
            where: verifyResponse.cuota
        })
        .then(cuotas => {
            console.info("cuotaController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de cuotas encontrada.'],
               cuotas: cuotas
           });
        })
        .catch(error => {
            console.error("cuotaController - find - ERROR: al intentar obtener listado de cuotas\n", error);
            console.info("cuotaController - find - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Error al intentar obtener lista de cuota.'],
                cuotas: null
            });
        })
    },
}