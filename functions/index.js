const functions = require("firebase-functions");
const { members } = require("./lib/members");
const { run: votingCompare } = require("./lib/votingComparing");
require("./lib/global");

const admin = require("firebase-admin");

exports.statistics = functions.https.onRequest(async (req, res) => {
  if (!admin.apps.length) {
    admin.initializeApp();
  }

  await members();

  await votingCompare();

  res.send("Data fetched");
});
