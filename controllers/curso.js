const curso = require('../models').curso;
const comision = require('../models').comision;
const { verifyHelper } = require("../helpers/verify-helper");
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const imageHelper = require('../helpers/image-helper').imageHelper;

module.exports = {

    create(req, res){
        console.info("cursoController - create - START");

        let verifyResponse = verifyHelper.verifyCurso(req, requestMethodAction.CREATE);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un curso
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("cursoController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("cursoController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                curso: null
            });
        }

        curso.create(verifyResponse.curso)
        .then(cursos => {
            console.info("cursoController - create - END");

            return res.status(200).send({
                exito: true,
                messages: ['curso creado correctamente.'],
                cursos: cursos
            });
        })
        .catch(error => {
            console.error("cursoController - create - ERROR: al intentar guardar el curso", error);
            console.info("cursoController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                cursos: null
            });
        });
    },

    update(req, res){
        console.info("cursoController - update - START");
        let verifyResponse = verifyHelper.verifyCurso(req, requestMethodAction.UPDATE);
        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un curso
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("cursoController - update - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("cursoController - update - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                cursos: null
            });
        }

        let nombreImagen = imageHelper.fotoTreatment(req.body.imagen, "cursoId_"+req.body.id,"images/curso/");
        verifyResponse.curso.imagen = nombreImagen;
        curso.update(verifyResponse.curso,{where: {id: verifyResponse.curso.id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("cursoController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['El curso ha sido actualizado correctamente.'],
                    cursos: null
                }
            } else {
                console.error("cursoController - update - ERROR: No se pudo actualizar el curso");
                console.info("cursoController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar el curso.'],
                    cursos: null
                }
            }

            return res.status(statusCode).send(object);
        })
        .catch(error => {
            console.error("cursoController - update - ERROR: al intentar guardar el curso", error);
            console.info("cursoController - update - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                cursos: null
            });
        });
    },

    delete(req, res){
        console.info("cursoController - delete - START");
        
        let verifyResponse = verifyHelper.verifyCurso(req, requestMethodAction.DELETE);

        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("cursoController - delete - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("cursoController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                cursos: null
            });
        }

        curso.destroy({
            where: {id: verifyResponse.curso.id}
        }).then(num => {
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("cursoController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['El curso ha sido eliminado correctamente.'],
                    cursos: null
                };
                statusCode = 200;
            } else {
                console.error("cursoController - delete - ERROR: No se pudo eliminar el curso");
                console.info("cursoController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`El curso con id ${id} no existe en el sistema.`],
                    cursos: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("cursoController - delete - ERROR: No se pudo eliminar el curso");
            console.info("cursoController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar el curso.'],
                    cursos: null
              });
        })
    },

    findAll(req, res){
        curso.findAll({
            include: [ {model: comision, as: 'comisiones'}],
            order: ['id'],
            raw: false,
        })
        .then(cursos => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de cursos encontrada.'],
                cursos: cursos
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de cursos', error],
            cursos: null
        }))
    },

    find(req, res){
        console.info("cursoController - find - START");

        let verifyResponse = verifyHelper.verifyCurso(req, requestMethodAction.FIND);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un curso
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("cursoController - find - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("cursoController - find - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                cursos: null
            });
        }

        curso.findAll({ 
            include: [ {model: comision, as: 'comisiones'}],
            order: ['id'],
            raw: false,
            where: verifyResponse.curso 
        })
        .then(cursos => {
            console.info("cursoController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de cursos encontrada.'],
               cursos: cursos
           });
        })
    }
}