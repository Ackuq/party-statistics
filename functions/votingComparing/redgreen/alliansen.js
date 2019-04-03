const { get } = require("../../functions");
const { updateGroups, copyGroups } = require("../comparingFunctions");

const url =
  "https://data.riksdagen.se/voteringlistagrupp/?rm=2018%2F19&rm=2017%2F18&rm=2016%2F17&rm=2015%2F16&rm=2014%2F15&bet=&punkt=&grupp1=MP&grupp1=S&grupp1=V&grupp2=C&grupp3=FP&grupp3=L&grupp4=KD&grupp5=M&utformat=json";

const initialGroups = {
  Grupp1: { parties: ["S", "MP", "V"] },
  Grupp2: { parties: ["C"], common: 0 },
  Grupp3: { parties: ["L", "FP"], common: 0 },
  Grupp4: { parties: ["KD"], common: 0 },
  Grupp5: { parties: ["M"], common: 0 }
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
