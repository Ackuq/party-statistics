const selectMax = (index, votering) => {
  const maxVal = Math.max(
    parseInt(votering[`Grupp${index}-Ja`]),
    parseInt(votering[`Grupp${index}-Nej`]),
    parseInt(votering[`Grupp${index}-Avstår`]),
    parseInt(votering[`Grupp${index}-Frånvarande`])
  );

  if (maxVal === 0) {
    return;
  }

  if (maxVal == parseInt(votering[`Grupp${index}-Ja`])) return "Ja";
  else if (maxVal == parseInt(votering[`Grupp${index}-Nej`])) return "Nej";
  else return;
};

module.exports.copyGroups = src => {
  return JSON.parse(JSON.stringify(src));
};

module.exports.updateGroups = (groups, voteringar) => {
  for (let i = 0; i < Object.keys(voteringar).length; i++) {
    let votering = voteringar[i];
    let vote = selectMax(1, votering);
    if (vote) {
      for (let j = 1; j < Object.keys(groups).length; j++) {
        if (vote === selectMax(j + 1, votering)) {
          groups[`Grupp${j + 1}`].common++;
        }
      }
    }
  }
  return groups;
};

module.exports.groupParse = (groups, id) => {
  for (let i = 0; i < Object.keys(groups).length; i++) {
    let parties = groups[`Grupp${i + 1}`].parties;
    for (let j = 0; j < parties.length; j++) {
      parties[j] = partyMap[parties[j]].name;
    }
  }
  let parsed = {
    [id]: {
      parties: groups[`Grupp1`].parties,
      common: []
    }
  };
  for (let i = 1; i < Object.keys(groups).length; i++) {
    let group = groups[`Grupp${i + 1}`];
    parsed[id].common.push({ parties: group.parties, common: group.common });
  }
  return parsed;
};
