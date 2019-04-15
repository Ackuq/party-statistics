const { start: alliansen } = require("./alliansen");
const { groupParse } = require("../comparingFunctions");
const { store } = require("../../firestore");

const doc = "Redgreen";

module.exports.start = async () => {
  await alliansen().then(groups => {
    groups = groupParse(groups, "alliansen");
    store(groups, doc);
  });
};
