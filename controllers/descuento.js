const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const { verifyHelper } = require("../helpers/verify-helper");
const descuento = require('../models').descuento;

module.exports = {

    create(req, res) {
        console.info("descuentoController - create - START");

        let verifyResponse = verifyHelper.verifyDescuento(req, requestMethodAction.CREATE);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un descuento
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("descuentoController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("descuentoController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                descuentos: null
            });
        }

        descuento.create(verifyResponse.descuento)
        .then(descuentos => {
            console.info("descuentoController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['descuento creado correctamente.'],
                descuentos: descuentos
            });
        })
        .catch(error => {
            console.error("descuentoController - create - ERROR: al intentar guardar el descuento", error);
            console.info("descuentoController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                descuentos: null
            });
        });
    },

    update(req, res){
        console.info("descuentoController - update - START");

        let verifyResponse = verifyHelper.verifyDescuento(req, requestMethodAction.UPDATE);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un descuento
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("descuentoController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("descuentoController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                descuentos: null
            });
        }

        descuento.update(verifyResponse.descuento,{where: {id: verifyResponse.descuento.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("descuentoController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['El descuento ha sido actualizado correctamente.'],
                    descuentos: null
                }
            } else {
                console.error("descuentoController - update - ERROR: No se pudo actualizar el descuento");
                console.info("descuentoController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar el descuento.'],
                    descuentos: null
                }
            }

            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("descuentoController - update - ERROR: al intentar guardar el descuento", error);
            console.info("descuentoController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                descuentos: null
            });
        });
    },

    delete(req, res){
        console.info("descuentoController - delete - START");
        
        let verifyResponse = verifyHelper.verifyDescuento(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("descuentoController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("descuentoController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                descuentos: null
            });
        }

        descuento.destroy({
            where: {id: verifyResponse.descuento.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("descuentoController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['El descuento ha sido eliminado correctamente.'],
                    descuentos: null
                };
                statusCode = 200;
            } else {
                console.error("descuentoController - delete - ERROR: No se pudo eliminar el descuento");
                console.info("descuentoController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`El descuento con id ${id} no existe en el sistema.`],
                    descuentos: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("descuentoController - delete - ERROR: No se pudo eliminar el descuento");
            console.info("descuentoController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar el descuento.'],
                    descuentos: null
              });
        })
    }, 

    findAll(req, res){
        descuento.findAll()
        .then(descuentos => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de descuentos encontrada.'],
                descuentos: descuentos
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de descuentos', error],
            descuentos: null
        }))
    },

    find(req, res){
        console.info("descuentoController - find - START");

        let verifyResponse = verifyHelper.verifyDescuento(req, requestMethodAction.FIND);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un descuento
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("descuentoController - find - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("descuentoController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                descuentos: null
            });
        }

        descuento.findAll({  where: verifyResponse.descuento })
        .then(descuentos => {
            console.info("descuentoController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de descuentos encontrada.'],
               descuentos: descuentos
           });
        })
    }
}
