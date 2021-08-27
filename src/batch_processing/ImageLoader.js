const jimp = require("jimp");
const path = require("path");
const fs = require("fs");
const isDev = true; //require("isDev");
const inputPath = path.join(__dirname, (isDev ? `/../../input/` : `/../input/`));
const outputPath = path.join(__dirname, (isDev ? `/../../output/` : `/../output/`));

function getImageNames() {
    return new Promise((resolve, reject) => {
        fs.readdir(inputPath, (err, names) => {
            if (err) reject(err);
            else resolve(names);
        });
    });
}

function writeImage(filename, image) {
    image.writeAsync(path.join(outputPath, filename));
}

function loadImage(filename) {
    let fullName = path.join(inputPath, filename);
    return new Promise((resolve, reject) => {
        if (!fs.existsSync(fullName)) {
            reject("File does not exist: " + filename);
            return;
        }
        jimp.read(fullName, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
}

function loadImages(batch) {
    return new Promise((resolve, reject) => {
        let imageProm = Object.keys(batch.input).map((x) => loadImage(batch.input[x]));
        Promise.all(imageProm)
            .then((data) => {
                let out = { input: {}, outputName: batch.output };
                const keys = Object.keys(batch.input);
                data.forEach((value, index) => {
                    out.input[keys[index]] = value;
                });

                resolve(out);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

module.exports = { loadImages: loadImages, getImageNames: getImageNames, writeImage: writeImage};
