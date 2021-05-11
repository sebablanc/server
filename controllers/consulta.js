
const emailSend = require('./sendEmail');
const { verifyHelper } = require("../helpers/verify-helper");

module.exports = {
    send(req, res){
        console.info("consultaController - create - START");
        
        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyConsulta(req);
        
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("consultaController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("consultaController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors
            });
        }

        if(verifyResponse.consulta){
            let body = req.body;

            let emailMessage = `Hola mi nombre es: ${body.nombre} ${body.apellido}<hr />
                                <p>${body.consulta}</p><hr />
                                <div>Mi email es: ${body.email}</div><hr />
                                <div>Mi teléfono es: ${body.telefono}</div><hr />`

           emailSend.sendEmailConsulta(body.email,emailMessage, function(emailSended){
               console.log(emailSended);
               let statusCode = emailSended ? 200 : 400;
               let message = emailSended ? 'Su consulta ha sido enviada correctamente' : 'Error al intentar enviar su consulta';
               
               console.log('llega a este return');
               return res.status(statusCode).send({
                   exito: emailSended,
                   messages: [message]
               });
           });
        }
    }
}