const pdfHelper = require('../helpers/pdf-helper').pdfHelper;

module.exports = {
    uploadProgramaCurso(req,res){
        pdfHelper.pdfTreatment(req.body.pdf, 'programaCursoId_'+req.body.idCurso, `archivos/curso/${req.body.idCurso}`);
        return res.status(200).send({message: 'pdf guardado correctamente'});
    }
}