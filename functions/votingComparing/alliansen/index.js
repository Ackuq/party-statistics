const { start: redgreen } = require("./redgreen");
const { groupParse } = require("../comparingFunctions");
const { store } = require("../../firestore");

const doc = "Alliansen";

module.exports.start = async () => {
  await redgreen().then(groups => {
    groups = groupParse(groups, "redgreen");
    store(groups, doc);
  });
};
