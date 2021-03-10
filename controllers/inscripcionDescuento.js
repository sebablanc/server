const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const inscripcionDescuento = require('../models').inscripcionDescuento;
const alumnoComision = require('../models').alumnoComision;
const descuento = require('../models').descuento;

module.exports = {
    create(req, res){
        console.info("inscripcionDescuentoController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyInscripcionDescuento(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("inscripcionDescuentoController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("inscripcionDescuentoController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                inscripcionesDescuentos: null
            });
        }

        inscripcionDescuento.create(verifyResponse.inscripcionDescuento)
        .then(inscripcionesDescuentos => {
            console.info("inscripcionDescuentoController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['Se ha aplicado el descuento a la inscripción guardada correctamente.'],
                inscripcionesDescuentos: inscripcionesDescuentos
            });
        })
        .catch(error => {
            console.error("inscripcionDescuentoController - create - ERROR: al intentar guardar la cuota", error);
            console.info("inscripcionDescuentoController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                inscripcionesDescuentos: null
            });
        });
    },

    
    update(req, res){
        console.info("inscripcionDescuentoController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyInscripcionDescuento(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("inscripcionDescuentoController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("inscripcionDescuentoController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                inscripcionesDescuentos: null
            });
        }

        inscripcionDescuento.update(verifyResponse.inscripcionDescuento,{where: {id: verifyResponse.inscripcionDescuento.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("inscripcionDescuentoController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['Se aplicó el descuento a la inscripción.'],
                    inscripcionesDescuentos: null
                }
            } else {
                console.error("inscripcionDescuentoController - update - ERROR: No se pudo actualizar la inscrpición con el descuento");
                console.info("inscripcionDescuentoController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la inscripción con el descuento.'],
                    inscripcionesDescuentos: null
                }
            }
            
            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("inscripcionDescuentoController - update - ERROR: al intentar guardar la cuota", error);
            console.info("inscripcionDescuentoController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                inscripcionesDescuentos: null
            });
        });
    },
    
    delete(req, res){
        console.info("inscripcionDescuentoController - delete - START");
        
        let verifyResponse = verifyHelper.verifyInscripcionDescuento(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("inscripcionDescuentoController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("inscripcionDescuentoController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                inscripcionesDescuentos: null
            });
        }

        inscripcionDescuento.destroy({
            where: {id: verifyResponse.inscripcionDescuento.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("inscripcionDescuentoController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['El descuento se ha sido quitado de la inscripción correctamente.'],
                    inscripcionesDescuentos: null
                };
                statusCode = 200;
            } else {
                console.error("inscripcionDescuentoController - delete - ERROR: No se pudo quitar el descuento de la inscripción");
                console.info("inscripcionDescuentoController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La inscripción no posee el descuento proporcionado, no se puede quitar.`],
                    inscripcionesDescuentos: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("inscripcionDescuentoController - delete - ERROR:  No se pudo quitar el descuento de la inscripción");
            console.info("inscripcionDescuentoController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                    inscripcionesDescuentos: null
              });
        })
    },
    
    findAll(req, res){
        inscripcionDescuento.findAll({ 
            include: [ {model: alumnoComision, as: 'inscripcion'}, {model: descuento, as: 'descuentos'} ],
            order: ['id'],
            attributes:{ exclude: ['alumnoComisionId', 'descuentoId'] },
            raw: false
        })
        .then(inscripcionDescuento => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de descuentos encontrada.'],
                inscripcionDescuento: inscripcionDescuento
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Error al intentar obtener lista de cuota.'],
            inscripcionDescuento: null
        }));
    },
    
    find(req, res){
        console.info("inscripcionDescuentoController - find - START");

        let verifyResponse = verifyHelper.verifyInscripcionDescuento(req, requestMethodAction.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("inscripcionDescuentoController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("inscripcionDescuentoController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                inscripcionDescuento: null
            });
        }

        inscripcionDescuento.findAll({ 
            include: [ {model: alumnoComision, as: 'inscripcion'}, {model: descuento, as: 'descuentos'} ],
            order: ['id'],
            attributes:{ exclude: ['alumnoComisionId', 'descuentoId'] },
            raw: false,
            where: verifyResponse.inscripcionDescuento
        })
        .then(inscripcionDescuento => {
            console.info("inscripcionDescuentoController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de descuentos encontrada.'],
               inscripcionDescuento: inscripcionDescuento
           });
        })
        .catch(error => {
            console.error("inscripcionDescuentoController - find - ERROR: al intentar obtener listado de descuentos con inscripciones\n", error);
            console.info("inscripcionDescuentoController - find - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Error al intentar obtener lista de descuentos.'],
                inscripcionDescuento: null
            });
        })
    }
}