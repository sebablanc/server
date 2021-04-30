const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const premio = require('../models').premio;

module.exports = {
    create(req, res){
        console.info("premioController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyPremio(req, requestMethodAction.CREATE);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("premioController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("premioController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                premios: null
            });
        }

        premio.create(verifyResponse.premio)
        .then(premios => {
            console.info("premioController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['Se ha guardado el sorteo correctamente.'],
                premios: premios
            });
        })
        .catch(error => {
            console.error("premioController - create - ERROR: al intentar guardar el sorteo", error);
            console.info("premioController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                premios: null
            });
        });
    },
}