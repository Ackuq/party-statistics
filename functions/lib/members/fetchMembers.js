const axios = require("axios");
var parseString = require("xml2js").parseString;

module.exports.fetch = async url => {
  try {
    const res = await axios.get(url);
    let processed = [];
    parseString(res.data, (err, result) => {
      processed = result.voteringlista.votering;
    });
    return processed;
  } catch (error) {
    console.log(error.message);
    return;
  }
};
