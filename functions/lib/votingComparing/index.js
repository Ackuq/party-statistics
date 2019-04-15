const { start: redgreen } = require("./redgreen/");
const { start: alliansen } = require("./alliansen");
const { start: sd } = require("./sd");

module.exports.run = () => {
  redgreen();
  alliansen();
  sd();
};
