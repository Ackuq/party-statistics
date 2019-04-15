const { get } = require("../../functions");
const { updateGroups, copyGroups } = require("../comparingFunctions");

const url =
  "http://data.riksdagen.se/voteringlistagrupp/?rm=2018%2F19&rm=2017%2F18&rm=2016%2F17&rm=2015%2F16&rm=2014%2F15&bet=&punkt=&grupp1=C&grupp1=FP&grupp1=L&grupp1=KD&grupp1=M&grupp2=MP&grupp3=S&grupp4=V&utformat=json";

const initialGroups = {
  Grupp1: { parties: ["C", "FP", "L", "KD", "M"] },
  Grupp2: { parties: ["MP"], common: 0 },
  Grupp3: { parties: ["S"], common: 0 },
  Grupp4: { parties: ["V"], common: 0 }
};

module.exports.start = async () => {
  let groups = copyGroups(initialGroups);
  return await get(url)
    .then(data => {
      data = data["voteringlista"];
      const voteringar = data["votering"];
      groups = updateGroups(groups, voteringar);
      return groups;
    })
    .catch(err => {
      console.log("Error getting url");
      return;
    });
};
