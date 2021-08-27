/**
 * Select what files are to be processed and how they are grouped together
 *
 * @param {[String]} filenames list of all file names in the input directory
 * @return {InputList} Return a list of objects that show the input files for each batch and the output name
 */
//
function main(filenames, imageList) {
    filenames.forEach((filename) => {
        let [id, component] = filename.split("_");
        component = component.split(".")[0];

        imageList.addItem(id, component, filename);
    });

    return imageList;
}

module.exports = main;
