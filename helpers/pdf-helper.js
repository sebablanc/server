const Sequelize = require('sequelize');
var httpRequestActions = require('./constant-helpers').REQUEST_METHODS_ACTION;
const { Op } = require("sequelize");
const fs = require('fs');

module.exports.pdfHelper = {
    pdfTreatment(pdf, pdfName, folder){
        var extension = '';
        var base64Data = pdf.replace(/^data:application\/pdf;base64,/, "");
        fs.writeFile(folder+pdfName+'.pdf', base64Data, 'base64', function(err) {
            console.log(err);
        });

        return pdfName+'.pdf';
    },

}