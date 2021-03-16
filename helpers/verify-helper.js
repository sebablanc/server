const Sequelize = require('sequelize');
var httpRequestActions = require('./constant-helpers').REQUEST_METHODS_ACTION;
const { Op } = require("sequelize");

module.exports.verifyHelper = {
    verifyUser(req, userAction){
        console.log("verifyHelper - verifyUser - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        let errorsList = [];
        let parsedUser = {};

        //verifico que existan keys
        if(keys == null || keys.length <= 0){
            errorsList.push('El usuario enviado no tiene ningún atributo.');
        } else if((id == null || id == undefined || id < 1) && userAction != httpRequestActions.CREATE && userAction != httpRequestActions.FIND){
            console.error("verifyHelper - verifyUser - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyUser - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.email == null || req.body.pass == null) && userAction == httpRequestActions.CREATE){
            errorsList.push('No se envíaron alguno de los siguientes datos: Email o contraseña.');
        }

  
        if(userAction != httpRequestActions.DELETE){
            keys.forEach(key => {
                switch(key.toLowerCase()) {
                    case "email":
                        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                        let testResult = req.body[key] ? re.test(String(req.body[key]).toLowerCase()) : false;
                        if(testResult && (userAction == httpRequestActions.CREATE || userAction == httpRequestActions.FIND || userAction == httpRequestActions.LOGIN)){
                            parsedUser[key] = req.body[key];
                        } else if(testResult && userAction != httpRequestActions.CREATE){
                            errorsList.push(`No es posible cambiar el mail, si lo desea, borre el usuario y cree uno nuevo con otro email.`);
                        } else {
                            errorsList.push(`El ${key.toLowerCase()} enviado es inválido o nulo.`);
                        }
                        break;
                    case "pass":
                        if(req.body[key] == null || req.body[key] == undefined || req.body[key].trim() == '' && (userAction != httpRequestActions.FIND)){
                            errorsList.push(`El ${key.toLowerCase()} enviado es inválido o nulo.`);
                        } else {
                            parsedUser[key] = req.body[key];
                        }
                        break;
                    case "id":
                    case "activated":
                    case "personaid":
                        parsedUser[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos para realizar esta acción en un usuario.');
                        break;
                }
            });
        } else{
            parsedUser.id = id;
        }

        console.log("verifyHelper - verifyUser - END");
        return {errors: errorsList, user: parsedUser};
    },

    verifyDescuento(req, descuentoAction){
        console.log("verifyHelper - verifyDescuento - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        let errorsList = [];
        let parsedDescuento = {};

        //verifico que existan keys
        if(keys == null || keys.length <= 0){
            errorsList.push('El descuento enviado no tiene ningún atributo para realizar esta acción.');
        } else if((id == null || id == undefined || id < 1) && (descuentoAction == httpRequestActions.DELETE || descuentoAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyDescuento - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyDescuento - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.razon == null || req.body.porcentaje == null) && descuentoAction == httpRequestActions.CREATE){
            errorsList.push('No se envíaron alguno de los siguientes campos: razon o porcentaje.');
        }

        if(descuentoAction != httpRequestActions.DELETE){
            keys.forEach(key => {
                switch(key.toLowerCase()) {
                    case "razon":
                        if (req.body[key] == null || req.body[key] == undefined || req.body[key].trim() == '' ){
                            errorsList.push('El campo razón enviado es inválido o nulo.');
                        } else if(descuentoAction == httpRequestActions.FIND){
                            parsedDescuento[key] = req.body[key] ? { [Op.like]: '%'+req.body[key]+'%' } : req.body[key];
                        } else {
                            parsedDescuento[key] = req.body[key];
                        }
                        break;
                    case "porcentaje":
                        if(req.body[key] == null || req.body[key] == undefined || req.body[key] < 1){
                            errorsList.push(`El campo ${key.toLowerCase()} enviado es inválido o nulo.`);
                        } else {
                            parsedDescuento[key] = req.body[key];
                        }
                        break;
                    case "id":
                    case "seleccion":
                        parsedDescuento[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos para realizar esta acción en un descuento.');
                        break;
                }
            });
        } else {
            parsedDescuento.id = id;
        }

        console.log("verifyHelper - verifyDescuento - END");
        
        return {errors: errorsList, descuento: parsedDescuento};
    },

    verifyCurso(req, cursoAction){
        console.log("verifyHelper - verifyCurso - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        let errorsList = [];
        let parsedCurso = {};

        //verifico que existan keys
        if(keys == null || keys.length <= 0){
            errorsList.push('El curso enviado no tiene ningún atributo para realizar esta acción.');
        } else if((id == null || id == undefined || id < 1) && (cursoAction == httpRequestActions.DELETE || cursoAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyCurso - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyCurso - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.nombre == null || req.body.valor == null) && cursoAction == httpRequestActions.CREATE){
            errorsList.push('No se envíaron alguno de los siguientes campos: nombre o valor.');
        }

        if(cursoAction != httpRequestActions.DELETE){
            keys.forEach(key => {
                switch(key.toLowerCase()) {
                    case "nombre":
                        if (req.body[key] == null || req.body[key] == undefined || req.body[key].trim() == '' ){
                            errorsList.push('El campo nombre enviado es inválido o nulo.');
                        } else if(cursoAction == httpRequestActions.FIND){
                            parsedCurso[key] = req.body[key] ? { [Op.like]: '%'+req.body[key]+'%' } : req.body[key];
                        } else {
                            parsedCurso[key] = req.body[key];
                        }
                        break;
                    case "valor":
                        if(req.body[key] == null || req.body[key] == undefined || req.body[key] < 1){
                            errorsList.push(`El campo ${key.toLowerCase()} enviado es inválido o nulo.`);
                        } else {
                            parsedCurso[key] = req.body[key];
                        }
                        break;
                    case "id":
                    case "imagen":
                    case "programa":
                        parsedCurso[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos para realizar esta acción en un curso.');
                        break;
                }
            });
        } else {
            parsedCurso.id = id;
        }

        console.log("verifyHelper - verifyCurso - END");
        
        return {errors: errorsList, curso: parsedCurso};
    },

    verifyAlumno(req, alumnoAction){
        console.log("verifyHelper - verifyAlumno - START");

        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;
        
         // creo elementos a devolver
         let errorsList = [];
         let parsedAlumno = {};

        // Verifico información principal
        if(keys == null || keys.length <= 0){
            errorsList.push('El alumno enviado no tiene ningún atributo para realizar esta acción.');
        } else if((id == null || id == undefined || id < 1) && (alumnoAction == httpRequestActions.DELETE || alumnoAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyAlumno - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyAlumno - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.dni == null || req.body.personaId == null) && alumnoAction == httpRequestActions.CREATE){
            errorsList.push('No se envíaron alguno de los siguientes campos: DNI o ID de la persona.');
        }

        if(alumnoAction != httpRequestActions.DELETE){
            keys.forEach(key =>{
                switch (key.toLowerCase()) {
                    case "fechanacimiento":
                        parsedAlumno[key] = req.body[key];
                        break;
                    case "dni":
                    case "id":
                    case "foto":
                    case "personaid":
                        parsedAlumno[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos para guardar realizar esta acción en una persona.');
                        break;
                }
            })
        } else {
            parsedAlumno.id = id;
        }

        console.log("verifyHelper - verifyAlumno - END");
        return {errors: errorsList, alumno: parsedAlumno};
    },

    verifyComision(req, comisionAction){
        console.log("verifyHelper - verifyComision - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        // creo elementos a devolver
        let errorsList = [];
        let parsedComision = {};

        // Verifico información principal
        if(keys == null || keys.length <= 0){
            errorsList.push(`La comisión enviada no tiene ningún atributo para realizar esta acción.`);
        } else if((id == null || id == undefined || id < 1) && (comisionAction == httpRequestActions.DELETE || comisionAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyComision - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyComision - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.cursoId == null) && comisionAction == httpRequestActions.CREATE){
            errorsList.push('No se envió el id del curso.');
        }

        if(comisionAction != httpRequestActions.DELETE){
            keys.forEach(key =>{
                switch (key.toLowerCase()) {
                    case "horadesde":
                    case "horahasta":
                        parsedComision[key] = Date.parse(req.body[key]+"+0000");
                        break;
                    case "id":
                    case "cursoid":
                    case "dias":
                    case "fechainicio":
                    case "fechafin":
                        parsedComision[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos para realizar esta acción en una comisión.');
                        break;
                }
            })
        } else {
            parsedComision.id = id;
        }

        console.log("verifyHelper - verifyComision - END");
        return {errors: errorsList, comision: parsedComision};
    },

    verifyAlumnoComision(req, alumnoComisionAction){
        console.log("verifyHelper - verifyAlumnoComision - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        // creo elementos a devolver
        let errorsList = [];
        let parsedAlumnoComision = {};

        // Verifico información principal
        if(keys == null || keys.length <= 0){
            errorsList.push(`La inscripción no posee datos para realizar la acción.`);
        } else if((id == null || id == undefined || id < 1) && (alumnoComisionAction == httpRequestActions.DELETE || alumnoComisionAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyAlumnoComision - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyAlumnoComision - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.alumnoId == null || req.body.comisionId == null) && alumnoComisionAction == httpRequestActions.CREATE){
            errorsList.push('No se envíaron alguno de los siguientes campos: ID de la persona o de la comisión.');
        }

        if(alumnoComisionAction != httpRequestActions.DELETE){
            keys.forEach(key =>{
                switch (key.toLowerCase()) {
                    case "id":
                    case "fechainscripcion":
                    case "alumnoid":
                    case "comisionid":
                        parsedAlumnoComision[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('SSe enviaron datos no válidos realizar esta acción en una inscripción.');
                        break;
                }
            })
        } else {
            parsedAlumnoComision.id = id;
        }

        console.log("verifyHelper - verifyAlumnoComision - END");
        return {errors: errorsList, alumnoComision: parsedAlumnoComision};
    },

    verifyCuota(req, cuotaAction){
        console.log("verifyHelper - verifyCuota - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        // creo elementos a devolver
        let errorsList = [];
        let parsedCuota = {};

        // Verifico información principal
        if(keys == null || keys.length <= 0){
            errorsList.push(`La cuota no posee datos para realizar la acción.`);
        } else if((id == null || id == undefined || id < 1) && (cuotaAction == httpRequestActions.DELETE || cuotaAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyCuota - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyCuota - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.alumnoComisionId == null) && cuotaAction == httpRequestActions.CREATE){
            errorsList.push('Debe seleccionar una inscripción para guardar la cuota.');
        }

        if(cuotaAction != httpRequestActions.DELETE){
            keys.forEach(key =>{
                switch (key.toLowerCase()) {
                    case "id":
                    case "alumnocomisionid":
                    case "pagado":
                    case "nrocuota":
                    case "fechavenc":
                    case "fechapago":
                        parsedCuota[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos realizar esta acción en una cuota.');
                        break;
                }
            })
        } else {
            parsedCuota.id = id;
        }

        console.log("verifyHelper - verifyCuota - END");
        return {errors: errorsList, cuota: parsedCuota};
    },

    verifyInscripcionDescuento(req, inscripcionDescuentoAction){
        console.log("verifyHelper - verifyInscripcionDescuento - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        // creo elementos a devolver
        let errorsList = [];
        let parsedInscripcionDescuento = {};

        // Verifico información principal
        if(keys == null || keys.length <= 0){
            errorsList.push(`No se puede aplicar el descuento a la inscripcion ya que no posee datos para realizar la acción.`);
        } else if((id == null || id == undefined || id < 1) && (inscripcionDescuentoAction == httpRequestActions.DELETE || inscripcionDescuentoAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyInscripcionDescuento - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyInscripcionDescuento - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.alumnoComisionId == null || req.body.descuentoId == null) && inscripcionDescuentoAction == httpRequestActions.CREATE){
            errorsList.push('Debe seleccionar una inscripción y un descuento para realizar esta acción.');
        }

        if(inscripcionDescuentoAction != httpRequestActions.DELETE){
            keys.forEach(key =>{
                switch (key.toLowerCase()) {
                    case "id":
                    case "alumnocomisionid":
                    case "descuentoid":
                        parsedInscripcionDescuento[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos realizar esta acción en una cuota.');
                        break;
                }
            })
        } else {
            parsedInscripcionDescuento.id = id;
        }

        console.log("verifyHelper - verifyInscripcionDescuento - END");
        return {errors: errorsList, inscripcionDescuento: parsedInscripcionDescuento};
    },

    verifyAsistencia(req, asistenciaAction){
        console.log("verifyHelper - verifyAsistencia - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        // creo elementos a devolver
        let errorsList = [];
        let parsedAsistencia = {};

        // Verifico información principal
        if(keys == null || keys.length <= 0){
            errorsList.push(`No se puede aplicar la asistencia ya que no posee datos para realizar la acción.`);
        } else if((id == null || id == undefined || id < 1) && (asistenciaAction == httpRequestActions.DELETE || asistenciaAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyAsistencia - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyAsistencia - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.alumnoComisionId == null) && asistenciaAction == httpRequestActions.CREATE){
            errorsList.push('Debe seleccionar un alumno para realizar esta acción.');
        }

        if(asistenciaAction != httpRequestActions.DELETE){
            keys.forEach(key =>{
                switch (key.toLowerCase()) {
                    case "id":
                    case "alumnocomisionid":
                    case "fechaclase":
                    case "asiste":
                        parsedAsistencia[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos realizar esta acción en una cuota.');
                        break;
                }
            })
        } else {
            parsedAsistencia.id = id;
        }

        console.log("verifyHelper - verifyAsistencia - END");
        return {errors: errorsList, asistencia: parsedAsistencia};
    },

    verifyPersonaCurso(req, personaCursoAction){
        console.log("verifyHelper - verifyPersonaCurso - START");
        
        let keys = req.body ? Object.keys(req.body) : [];
        let id = req.body && req.body.id ? req.body.id : null;

        // creo elementos a devolver
        let errorsList = [];
        let parsedPersonaCurso = {};

        // Verifico información principal
        if(keys == null || keys.length <= 0){
            errorsList.push(`No se puede aplicar la observación ya que no posee datos para realizar la acción.`);
        } else if((id == null || id == undefined || id < 1) && (personaCursoAction == httpRequestActions.DELETE || personaCursoAction == httpRequestActions.UPDATE)){
            console.error("verifyHelper - verifyPersonaCurso - ERROR: No se envió id", keys);
            console.info("verifyHelper - verifyPersonaCurso - END");
            errorsList.push('No se envió un id válido.');
        } else if(keys.length > 0 && (req.body.personaId == null || req.body.cursoId == null) && personaCursoAction == httpRequestActions.CREATE){
            errorsList.push('Debe seleccionar un alumno o un curso para realizar esta acción.');
        }

        if(personaCursoAction != httpRequestActions.DELETE){
            keys.forEach(key =>{
                switch (key.toLowerCase()) {
                    case "id":
                    case "fechacons":
                    case "cursoid":
                    case "personaid":
                    case "observacion":
                    case "color":
                        parsedPersonaCurso[key] = req.body[key];
                        break;
                    default:
                        // ERROR - si existe una key distinta a las cuatro anteriores, quiere decir que es un parámetro incorrecto
                        errorsList.push('Se enviaron datos no válidos realizar esta acción en una cuota.');
                        break;
                }
            })
        } else {
            parsedPersonaCurso.id = id;
        }

        console.log("verifyHelper - verifyPersonaCurso - END");
        return {errors: errorsList, personaCurso: parsedPersonaCurso};
    }
}