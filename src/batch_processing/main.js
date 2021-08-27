const imageLoader = require("./ImageLoader");
const InputList = require("./InputList");
const libLoader = require("./LibLoader");

let procLib = [];
let loadLib = [];

function runBatch(loadName, procName, params) {
    let load = loadLib.find((x) => loadName == x.filename).data;
    let proc = procLib.find((x) => procName == x.filename).data;
    imageLoader.getImageNames().then((names) => {
        const groupedNames = load(names, new InputList()).images;
        Object.keys(groupedNames).forEach((batchID) => {
            let batch = groupedNames[batchID];
            imageLoader.loadImages(batch).then((imageGroup) => {
                proc(imageGroup.input, params).then((image) => {
                    imageLoader.writeImage(
                        `${imageGroup.outputName}.${image.getExtension()}`,
                        image
                    );
                });
            });
        });
    });
}

function load() {
    return new Promise((resolve, reject) => {
        libLoader()
            .then((modules) => {
                procLib = modules.proc;
                loadLib = modules.load;
                resolve();
            })
            .catch((err) => reject(err));
    });
}

load().then(() => {
    runBatch("loadAll", "resize", { width: 256, height: 256 });
});

module.exports = { loadLib: load, procLib: procLib, loadLib: load };
