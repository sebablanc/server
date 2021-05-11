const nodemailer = require('nodemailer');
const config = require('../config/config').sendEmailConfig;

module.exports = {
    sendEmail(email, subject, message){
        mailOptions = {
            from: 'blancseba@gmail.com',
            to: email,
            subject: subject,
            text: message
        };
        try{
            nodemailer.createTransport(config).sendMail(mailOptions, function(error, info){
                return error ? false : true;
            });
        } catch(err){
            console.log(err)
        }
    },

    sendEmailConsulta(email, message, callback){
        mailOptions = {
            from: email,
            to: 'softwarebuilderPruebas@gmail.com',
            subject: 'Consulta enviada desde DRComputersWeb',
            html: message
        };
        try{
            nodemailer.createTransport(config).sendMail(mailOptions, function(error, info){
                callback(info);
            });
        } catch(err){
            console.log(err);
        }
    }

}