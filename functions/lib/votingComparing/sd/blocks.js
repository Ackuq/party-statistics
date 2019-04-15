const { get } = require("../../functions");
const { updateGroups, copyGroups } = require("../comparingFunctions");

const url =
  "http://data.riksdagen.se/voteringlistagrupp/?rm=2018%2F19&rm=2017%2F18&rm=2016%2F17&rm=2015%2F16&rm=2014%2F15&bet=&punkt=&grupp1=SD&grupp2=C&grupp2=FP&grupp2=L&grupp2=KD&grupp2=M&grupp3=MP&grupp3=S&grupp3=V&utformat=json";

const initialGroups = {
  Grupp1: { parties: ["SD"] },
  Grupp2: { parties: ["C", "FP", "L", "KD", "M"], common: 0 },
  Grupp3: { parties: ["MP", "S", "V"], common: 0 }
};

module.exports.start = async () => {
  let groups = copyGroups(initialGroups);
  return await get(url)
    .then(data => {
      data = data["voteringlista"];
      groups = updateGroups(groups, data["votering"]);
      return groups;
    })
    .catch(err => {
      console.log("Error getting url");
      return;
    });
};
