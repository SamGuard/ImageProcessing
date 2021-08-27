const jimp = require("jimp");

function main({ image: image }, { width: width, height: height }) {
    return new Promise((resolve, reject) => {
        image.resize(width, height);
        resolve(image);
    });
}

module.exports = main;
