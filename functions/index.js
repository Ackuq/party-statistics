const functions = require("firebase-functions");
const redgreen = require("./votingComparing");
require("./global");

const admin = require("firebase-admin");

exports.statistics = functions.https.onRequest(async (req, res) => {
  if (!admin.apps.length) {
    admin.initializeApp();
  }

  await redgreen.run();

  res.send("Data fetched");
});
