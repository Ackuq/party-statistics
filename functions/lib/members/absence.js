const { fetch } = require("./fetchMembers");
const { store } = require("../firestore");
const url =
  "http://data.riksdagen.se/voteringlista/?rm=2018%2F19&bet=&punkt=&valkrets=&rost=&iid=&sz=10000&utformat=XML&gruppering=namn";

const doc = "Members";

module.exports.run = async () => {
  await fetch(url).then(data => {
    let result = {
      absence: []
    };
    for (let i = 0; i < data.length; i++) {
      let absence;
      if (data[i]["Frånvarande"][0])
        absence = parseInt(data[i]["Frånvarande"][0]);
      else absence = 0;

      let name = data[i].namn[0];

      if (leaders.includes(name)) {
        continue;
      }

      let total =
        absence +
        parseInt(data[i]["Avstår"][0]) +
        parseInt(data[i]["Ja"][0]) +
        parseInt(data[i]["Nej"][0]);
      result.absence.push({
        name: name,
        absence: absence,
        total: total
      });
    }
    store(result, "Members");
  });
};
