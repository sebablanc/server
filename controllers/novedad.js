const novedad = require('../models').novedad;
const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;

module.exports = {

    create(req, res){
        console.info("novedadController - create - START");

        console.log(req.body);
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

        console.log(verifyResponse.novedad);

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
    }
}