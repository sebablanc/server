const pdfController = require('../controllers/pdf');

module.exports = (app) => {
    app.post('/api/pdf/curso_programa', pdfController.uploadProgramaCurso);
    app.post('/api/pdf/curso_file', pdfController.pdfCursoFile);
}