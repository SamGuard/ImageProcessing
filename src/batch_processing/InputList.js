class InputList {
  constructor() {
    this.images = {};
  }

  batchExists(batchID){
    return !(this.images[batchID] === undefined);
  }

  addBatch(batchID, outputName) {
    if (this.batchExists(batchID)) {
      throw new Error("Batch already exists");
    }
    this.images[batchID] = { input: {}, output: outputName };
  }

  addItem(batchID, param, filename) {
    if (this.batchExists(batchID)) {
      this.images[batchID].input[param] = filename;
    } else {
      this.addBatch(batchID, batchID);
      this.addItem(batchID, param, filename);
    }
  }
}

module.exports = InputList;
