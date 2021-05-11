const pdfHelper = require('../helpers/pdf-helper').pdfHelper;
const { verifyHelper } = require("../helpers/verify-helper");
const cursoArchivo = require('../models').cursoArchivo;
const requestMethodAction = require("../helpers/constant-helpers").REQUEST_METHODS_ACTION;
const errors = require('../helpers/constant-helpers').ERROR_MESSAGES;

module.exports = {
    uploadProgramaCurso(req,res){
        pdfHelper.pdfTreatment(req.body.pdf, 'programaCursoId_'+req.body.idCurso, `archivos/curso/${req.body.idCurso}`);
        return res.status(200).send({message: 'pdf guardado correctamente'});
    },

    pdfCursoFile(req, res){
        console.info("pdfController - pdfCursoFile - START");

        let verifyResponse = verifyHelper.verifyCursoArchivo(req, requestMethodAction.CREATE);

        // devuelvo mensajes de error en caso de que no se cumpla alguna condición para guardar un curso
        if(verifyResponse && verifyResponse.errors && verifyResponse.errors.length > 0){
            console.error("pdfController - pdfCursoFile - ERROR: existen errores en los parámetros enviados", req.body);
            console.info("pdfController - pdfCursoFile - END");
            return res.status(400).send({
                exito: false,
                messages: verifyResponse.errors,
                cursoArchivo: null
            });
        }

        let archivo = verifyResponse && verifyResponse.cursoArchivo && verifyResponse.cursoArchivo.archivo ? verifyResponse.cursoArchivo.archivo : null;
        delete verifyResponse.cursoArchivo.archivo;

        cursoArchivo.create(verifyResponse.cursoArchivo)
        .then(cursoArchivo => {
            console.info("pdfController - pdfCursoFile - END");
            pdfHelper.pdfTreatment(archivo, verifyResponse.cursoArchivo.nombreArchivo, `archivos/curso/${req.body.cursoId}/material_didactico`)

            return res.status(200).send({
                exito: true,
                messages: ['curso creado correctamente.'],
                cursoArchivo: cursoArchivo
            });
        })
        .catch(error => {
            console.error("pdfController - pdfCursoFile - ERROR: al intentar guardar el curso", error);
            console.info("pdfController - pdfCursoFile - END");
            return res.status(404).send({
                exito: false,
                messages: [error && error.original && error.original.code && errors[error.original.code] ? errors[error.original.code] : 'Ocurrió un error al intentar guardar sus datos.'],
                cursoArchivo: null
            });
        });
    }
}