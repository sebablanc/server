const Sequelize = require('sequelize');
var httpRequestActions = require('./constant-helpers').REQUEST_METHODS_ACTION;
const { Op } = require("sequelize");
const fs = require('fs');

module.exports.imageHelper = {
    fotoTreatment(foto, imageName, folder){
        var extension = '';
        if(foto.includes('png')){
            extension = 'png';
            var base64Data = foto.replace(/^data:image\/png;base64,/, "");
        }else if(foto.includes('jpg')){
            extension = 'jpg';
            var base64Data = foto.replace(/^data:image\/jpg;base64,/, "");
        }else if(foto.includes('jpeg')){
            extension = 'jpeg';
            var base64Data = foto.replace(/^data:image\/jpeg;base64,/, "");
        }
        fs.writeFile(folder+imageName+"."+extension, base64Data, 'base64', function(err) {
            console.log(err);
        });

        return imageName+"."+extension;
    },

}