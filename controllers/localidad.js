const Sequelize = require('sequelize');
const { Op } = require("sequelize");
const localidad = require('../models').localidad;

module.exports = {
    create(req, res) {
        
        console.info("localidadController - create - START");
        
        let codPostal = req.body.codPostal;
        let ciudad = req.body.ciudad;
        let provincia = req.body.provincia ? req.body.provincia.trim() : req.body.provincia;
        
        if(!codPostal || codPostal < 0){
            console.error("localidadController - create - ERROR: sin codigo postal");
            console.info("localidadController - create - END");
        
            return res.status(400).send({
                exito: false,
                messages: ['Código Postal incorrecto'],
                localidades: null
            });
        }

        if(!ciudad || ciudad.length < 0 || ciudad.trim() == ''){
            console.error("localidadController - create - ERROR: sin nombre de ciudad");
            console.info("localidadController - create - END");
        
            return res.status(400).send({
                exito: false,
                messages: ['Debe proporcionar un nombre para ciudad.'],
                localidades: null
            });
        }

        localidad.create({
            codPostal: codPostal,
            ciudad: ciudad.trim(),
            provincia: provincia,
        })
        .then(localidad =>{ 
            console.info("localidadController - create - END");
            return res.status(200).send({
                exito: true,
                messages: ['Localidad creada correctamente'],
                localidades: localidad
            });
        })
        .catch(error => {
            console.error("localidadController - create - ERROR: al intentar guardar la localidad", error);
            console.info("localidadController - create - END");
            return res.status(404).send({
                exito: false,
                messages: ['Es posible que intenta ingresar datos que ya existen en la base de datos.'],
                localidades: null
            });
        });
    },

    update(req, res){
        console.info("localidadController - update - START");
        // obtengo array de keys de parámetros enviados
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        if(keys.length <= 0 || (keys.length == 1 && id != null)){
            console.error("localidadController - update - ERROR: No se envió ningún parámetro", keys);
            console.info("localidadController - update - END");
            return res.status(400).send({
                exito: false,
                messages: ['No se enviaron datos para actualizar la localidad.'],
                localidades: null
            });
        } else if(id == null || id == undefined || id < 1){
            console.error("localidadController - update - ERROR: No se envió id", keys);
            console.info("localidadController - update - END");
            return res.status(400).send({
                exito: false,
                messages: ['No se envió un id válido.'],
                localidades: null
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
                    break
                case "codPostal":
                case "ciudad":
                case "provincia":
                    filters[key] = req.body[key];
                    break;
                default:
                    // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                    keyError = true;
                    break;

            }
        });

        if(keyError){
            console.error("localidadController - update - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("localidadController - update - END");
            return res.status(400).send({
                exito: false,
                messages: ['Se enviaron datos no válidos para una localidad.'],
                localidades: null
            });
        }

        localidad.update(filters, { where: {id: id}}).then(num => {
            let object = {};
            let statusCode = 0;
            if(num[0]){
                console.info("localidadController - update - END");
                statusCode = 200;
                object = {
                    exito: true,
                    messages: ['La localidad ha sido actualizada correctamente.'],
                    localidades: null
                }
            } else {
                console.error("localidadController - update - ERROR: No se pudo actualizar la localidad");
                console.info("localidadController - update - END");
                statusCode = 202;
                object = {
                    exito: false,
                    messages: ['Error al intentar actualizar la localidad.'],
                    localidades: null
                }
            }

            return res.status(statusCode).send(object);
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar actualizar la localidad con id: '+id],
            localidades: null
        }));
    },

    delete(req, res){
        console.info("localidadController - delete - START");
        let id = req.body && req.body.id ? req.body.id : null;
        if(id == null || id == undefined || id < 1){
            console.error("localidadController - delete - ERROR: No se envió id");
            console.info("localidadController - delete - END");
            return res.status(400).send({
                exito: false,
                messages: ['No se envió un id válido.'],
                localidades: null
            });
        }

        localidad.destroy({
            where: {id: id}
        }).then(num => {
            
            let objectToReturn = {};
            let statusCode = 0;
            if(num){
                console.info("localidadController - delete - END");
                objectToReturn = {
                    exito: true,
                    messages: ['La localidad ha sido eliminada correctamente.'],
                    localidades: null
                };
                statusCode = 200;
            } else {
                console.error("localidadController - delete - ERROR: No se pudo eliminar la localidad");
                console.info("localidadController - delete - END");
                objectToReturn = {
                    exito: false,
                    messages: [`La localidad con id ${id} no existe en el sistema.`],
                    localidades: null
                };
                statusCode = 202;
            }

            return res.status(statusCode).send(objectToReturn);
        })
        .catch(error => {
            console.error("localidadController - delete - ERROR: No se pudo eliminar la localidad");
            console.info("localidadController - delete - END");
            return res.status(500).send({
                    exito: false,
                    messages: ['Error al intentar eliminar la localidad.'],
                    localidades: null
              });
        })
    },

    findAll(req, res) {
        localidad.findAll({
            order: ['ciudad']
        })
        .then(localidades => {
            return res.status(200).send({
                exito: true,
                messages: ['Lista de localidades encontrada.'],
                localidades: localidades
            })
        })
        .catch(error => res.status(404).send({
            exito: false,
            messages: ['Error al intentar obtener lista de localidades'],
            localidades: null
        }));
    },

    find(req, res) {
        console.info("localidadController - find - START");
        // obtengo array de keys de parámetros enviados
        let keys = Object.keys(req.body);

        //verifico que existan keys
        if(keys.length <= 0){
            console.error("localidadController - find - ERROR: No se envió ningún parámetro", keys);
            console.info("localidadController - find - END");
            return res.status(400).send({
                exito: false,
                messages: ['No se enviaron parámetros por los cuales realizar la búsqueda de localidades.'],
                localidades: null
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
                case "codpostal":
                    filters[key] = req.body[key];
                    break;
                case "ciudad":
                case "provincia":
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
            console.error("localidadController - find - ERROR: Se envió un parámetro incorrecto", req.body);
            console.info("localidadController - find - END");
            return res.status(400).send({
                exito: false,
                messages: ['Se enviaron parámetros por los cuales no se pueden buscar localidades.'],
                localidades: null
            });
        }
        
        localidad.findAll({
            where: filters,
            order: ['ciudad']
        })
        .then(localidades =>{
            console.info("localidadController - find - END");
             return res.status(200).send({
                exito: true,
                messages: ['Lista de localidades encontrada.'],
                localidades: localidades
            });
        })
        .catch(error => {
            console.error("localidadController - find - ERROR: al intentar obtener listado de localidades", keys);
            console.info("localidadController - find - END");
            return res.status(404).send({
                exito: false,
                messages: ['Error al intentar obtener lista de localidades'],
                localidades: null
            });
        });
    }
}