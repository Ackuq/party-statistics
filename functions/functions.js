const axios = require("axios");

module.exports.get = async url => {
  let data;
  try {
    const response = await axios.get(url);
    const data = response.data;
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};
