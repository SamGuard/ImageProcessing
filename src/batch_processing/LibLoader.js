const fs = require("fs");
const path = require("path");
const LIB_DIR = path.join(__dirname, "/../../lib/");

function loadLibrary(folder) {
    const modules = [];
    const fullDir = path.join(LIB_DIR, folder);
    return new Promise((resolve, reject) => {
        fs.readdir(fullDir, (err, files) => {
            if (err) throw err;

            files.forEach((file) => {
                if (path.extname(file) === ".js") {
                    modules.push({
                        filename: file.split(".")[0],
                        data: require(path.join(fullDir, file)),
                    });
                }
            });
            resolve(modules);
        });
    });
}

function main() {
    return new Promise((resolve, reject) => {
        loadLibrary("processing").then((procModules) => {
            loadLibrary("loading").then((loadingModules) => {
                resolve({ proc: procModules, load: loadingModules });
            });
        });
    });
}

module.exports = main;
