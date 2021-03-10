const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const alumno = require('../models').alumno;
const persona = require('../models').persona;

module.exports = {
    create(req, res){
        console.info("alumnoController - create - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyAlumno(req, requestMethodAction.CREATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("alumnoController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("alumnoController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnos: null
            });
        }

        alumno.create(verifyResponse.alumno)
        .then(alumnos => {
            console.info("alumnoController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['alumno creado correctamente.'],
                alumnos: alumnos
            });
        })
        .catch(error => {
            console.error("alumnoController - create - ERROR: al intentar guardar el alumno", error.original);
            console.info("alumnoController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                alumnos: null
            });
        });
    },

    update(req, res){
        console.info("alumnoController - update - START");

        //Verifico los datos enviados
        let verifyResponse = verifyHelper.verifyAlumno(req, requestMethodAction.UPDATE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("alumnoController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("alumnoController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnos: null
            });
        }

        alumno.update(verifyResponse.alumno,{where: {id: verifyResponse.alumno.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("alumnoController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['El alumno ha sido actualizado correctamente.'],
                    alumnos: null
                }
            } else {
                console.error("alumnoController - update - ERROR: No se pudo actualizar el alumno");
                console.info("alumnoController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar el alumno.'],
                    alumnos: null
                }
            }

            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("alumnoController - update - ERROR: al intentar guardar el alumno", error);
            console.info("alumnoController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                alumnos: null
            });
        });
    },

    delete(req, res){
        console.info("alumnoController - delete - START");
        
        let verifyResponse = verifyHelper.verifyAlumno(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("alumnoController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("alumnoController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnos: null
            });
        }

        alumno.destroy({
            where: {id: verifyResponse.alumno.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("alumnoController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['El alumno ha sido eliminado correctamente.'],
                    alumnos: null
                };
                statusCode = 200;
            } else {
                console.error("alumnoController - delete - ERROR: No se pudo eliminar el alumno");
                console.info("alumnoController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`El alumno con id ${id} no existe en el sistema.`],
                    alumnos: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("alumnoController - delete - ERROR: No se pudo eliminar el alumno");
            console.info("alumnoController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar el alumno.'],
                    alumnos: null
              });
        })
    },

    findAll(req, res){
        alumno.findAll({ 
            include: [ {model: persona, as: 'persona'} ],
            attributes:{ exclude: ['alumnoId'] },
            raw: false
        })
        .then(alumnos => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de alumnos encontrada.'],
                alumnos: alumnos
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de alumnos', error],
            alumnos: null
        }))
    },
    
    find(req, res){
        console.info("alumnoController - find - START");

        let verifyResponse = verifyHelper.verifyAlumno(req, requestMethodAction.FIND);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("alumnoController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("alumnoController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                alumnos: null
            });
        }

        alumno.findAll({ 
            include: [ {model: persona, as: 'persona'}],
            raw: false,
            where: verifyResponse.alumno
        })
        .then(alumnos => {
            console.info("alumnoController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de alumnos encontrada.'],
               alumnos: alumnos
           });
        })
        .catch(error => {
            console.error("alumnoController - find - ERROR: al intentar obtener listado de alumnos\n", error);
            console.info("alumnoController - find - END");
            return res.status(404).send({
                exito: false,
                messages: ['Error al intentar obtener lista de alumnos'],
                alumnos: null
            });
        })
    }
}