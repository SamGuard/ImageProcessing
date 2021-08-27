const jimp = require("jimp");
const fs = require("fs");
const fileType = ".png";

function main({ L: l, R: r, G: g, B: b }, {}) {
    return new Promise((resolve, reject) => {
        const width = l.bitmap.width;
        const height = l.bitmap.height;
        let pixelL, pixelR, pixelG, pixelB;
        let out = new jimp(width, height, (err, image) => {
            for (let x = 0; x < width; x++) {
                for (let y = 0; y < height; y++) {
                    pixelL = jimp.intToRGBA(l.getPixelColor(x, y)).r / 255;
                    pixelR = jimp.intToRGBA(r.getPixelColor(x, y)).r * pixelL;
                    pixelG = jimp.intToRGBA(g.getPixelColor(x, y)).r * pixelL;
                    pixelB = jimp.intToRGBA(b.getPixelColor(x, y)).r * pixelL;

                    image.setPixelColor(
                        jimp.rgbaToInt(pixelR, pixelG, pixelB, 255),
                        x,
                        y
                    );
                }
            }
            image.quality(100)
            .filterType(jimp.PNG_FILTER_NONE)
            .deflateLevel(0)
            .deflateStrategy(0);
            resolve(image);
        });
    });
}

module.exports = main;
