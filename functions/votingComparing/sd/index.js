const { start: block } = require("./blocks");
const { groupParse } = require("../comparingFunctions");
const { store } = require("../../firestore");

const doc = "Sverigedemokraterna";

module.exports.start = async () => {
  await block().then(groups => {
    groups = groupParse(groups, "blocks");
    store(groups, doc);
  });
};
