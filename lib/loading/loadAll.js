/**
 * Select what files are to be processed and how they are grouped together
 *
 * @param {[String]} filenames list of all file names in the input directory
 * @return {InputList} Return a list of objects that show the input files for each batch and the output name
 */
//
function main(filenames, imageList) {
    filenames.forEach((filename, index) => {
        imageList.addItem(index, "image", filename);
    });

    return imageList;
}

module.exports = main;
