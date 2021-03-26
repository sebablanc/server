const { Op } = require("sequelize");
const persona = require('../models').persona;
const localidad = require('../models').localidad;
const alumno = require('../models').alumno;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;
const verifyHelper = require('../helpers/verify-helper').verifyHelper;
const personaActions = require('../helpers/constant-helpers').REQUEST_METHODS_ACTION;

module.exports = {
    create(req, res){
        console.info("personaController - create - START");

        let verifyResponse = verifyHelper.verifyPersona(req, personaActions.CREATE);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar una persona
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("personaController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("personaController - create - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                personas: null
            });
        }

        persona.create(verifyResponse.persona, {include: [ {model: localidad, as: 'localidad'} ], attributes:{ exclude: ['localidadId'] }})
        .then(persona =>{ 
            console.info("personaController - create - END");
            return res.status(200).send({
                exito: true,
                messages: ['persona creada correctamente'],
                personas: [persona]
            });
        })
        .catch((error) => {
            console.error("personaController - create - ERROR: al intentar guardar la persona", error.original.code);
            console.info("personaController - create - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                personas: null
            });
        })
    },

    update(req, res){
        console.info("personaController - update - START");
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        let errorsList = [];
        let objectToSend = {};

        //verifico que existan keys
        if(keys == null || keys.length <= 0){
            errorsList.push('La persona enviada no tiene ningún atributo para guardar.');
        } else if(id == null || id == undefined || id < 1){
            console.error("personaController - update - ERROR: No se envió id", keys);
            console.info("personaController - update - END");
            errorsList.push('No se envió un id válido.');
        }

        // verifico que las keys sean las adecuadas y la info enviada correcta
        keys.forEach(key => {
            switch(key.toLowerCase()) {
                case "nrocuenta":
                    if (req.body[key] == null || req.body[key] == undefined || req.body[key].trim() == '' ){
                        errorsList.push('El número de cuenta enviado es inválido o nulo.');
                    } else {
                        objectToSend[key] = req.body[key];
                    }
                    break;
                case "nombre":
                case "apellido":
                case "telefono":
                    if(req.body[key] == null || req.body[key] == undefined || req.body[key].trim() == '' ){
                        errorsList.push(`El ${key.toLowerCase()} enviado es inválido o nulo.`);
                    } else {
                        objectToSend[key] = req.body[key];
                    }
                    break;
                case "id":
                case "direccion":
                case "celular":
                case "email":
                case "otromedio":
                case "localidadid":
                    objectToSend[key] = req.body[key];
                    break;
                case "localidad":
                    break;
                default:
                    // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                    errorsList.push('Se enviaron datos no válidos para guardar una persona.');
                    break;
            }
        });

        if(errorsList.length > 0){
            console.error("personaController - create - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("personaController - create - END");
            return res.status(400).send({
                exito: false,
                messages: errorsList,
                personas: null
            });
        }

        persona.update(objectToSend,{ where: {id: id}})
        .then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("personaController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['La persona ha sido actualizada correctamente.'],
                    personas: null
                }
            } else {
                console.error("personaController - update - ERROR: No se pudo actualizar la persona");
                console.info("personaController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la persona.'],
                    personas: null
                }
            }

            return res.status(statusCode).send(object);
        })
        .catch(error => {
            res.status(404).send({
            exito: false,
            messages:  [error && error.original && error.original.code ? errors[error.original.code] : 'Ocurrió un error al intentar actualizar sus datos.'],
            personas: null
        })})
    },

    delete(req, res){
        console.info("personaController - delete - START");
        let id = req.body && req.body.id ? req.body.id : null;
        if(id == null || id == undefined || id < 1){
            console.error("personaController - delete - ERROR: No se envió id");
            console.info("personaController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: ['No se envió un id válido.'],
                personas: null
            });
        }

        persona.destroy({
            where: {id: id}
        }).then(num => {
            
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("personaController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La persona ha sido eliminada correctamente.'],
                    personas: null
                };
                statusCode = 200;
            } else {
                console.error("personaController - delete - ERROR: No se pudo eliminar la persona");
                console.info("personaController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La persona con id ${id} no existe en el sistema.`],
                    personas: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("personaController - delete - ERROR: No se pudo eliminar la persona");
            console.info("personaController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar la persona.'],
                    personas: null
              });
        })
    },

    findAll(req, res){
        persona.findAll({ 
            include: [ {model: localidad, as: 'localidad'}, {model: alumno, as: 'alumno'} ],
            attributes:{ exclude: ['localidadId'] },
            raw: false
        })
        .then(personas => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de personas encontrada.'],
                personas: personas
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de personas', error],
            personas: null
        }))
    },

    find(req, res){
        console.info("personaController - find - START");

        // obtengo array de keys de parámetros enviados
        let keys = Object.keys(req.body);

        //verifico que existan keys
        if(keys.length <= 0){
            console.error("personaController - find - ERROR: No se envió ningún parámetro", keys);
            console.info("personaController - find - END");
            return res.status(400).send({
                exito: false,
                messages: ['No se enviaron parámetros por los cuales realizar la búsqueda de personas.'],
                personas: null
            });
        }

        // indica si se envió un parámetro inválido
        let keyError = false;

        // objeto que se utiliza para filtrar en la base de datos
        let filters = {};

        //se recorren las keys para enviarlas como parámetros del where en la query
        keys.forEach(key => {
            switch(key.toLowerCase()) {
                case "id":
                case "localidadid":
                    filters[key] = req.body[key];
                    break;
                case "nrocuenta":
                case "nombre":
                case "apellido":
                    if(req.body[key]){
                        filters[key] = { [Op.like]: '%'+req.body[key]+'%' };
                    } else {
                        filters[key] = req.body[key];
                    }
                    break;
                default:
                    // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                    keyError = true;
                    break;

            }
        });

        if(keyError){
            console.error("personaController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("personaController - find - END");
            return res.status(400).send({
                exito: false,
                messages: ['Se enviaron parámetros por los cuales no se pueden buscar personas.'],
                personas: null
            });
        }

        persona.findAll({ 
            include: [ {model: localidad, as: 'localidad'}, {model: alumno, as: 'alumno'} ],
            attributes:{ exclude: ['localidadId'] },
            raw: false,
            where: filters
        })
        .then(personas => {
            console.info("personaController - find - END");
            return res.status(200).send({
               exito: true,
               messages: ['Lista de personas encontrada.'],
               personas: personas
           });
        })
    },

    findLastNroCuenta(req, res){
        persona.findOne({attributes: ['nroCuenta'], order: [['id', 'DESC']], limit: 1})
        .then(nroCuenta => {
            return res.status(200).send({
                exito: true,
                messages: ['Nro de cuenta encontrado.'],
                nroCuenta: nroCuenta
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener el último número de cuenta', error],
            nroCuenta: null
        }))
    }
}