//const { firestore } = require("./init");
const admin = require("firebase-admin");

module.exports.store = async (data, doc) => {
  console.log("Storing...");
  await admin
    .firestore()
    .collection("Statistics")
    .doc(doc)
    .update(data)
    .then(() => {
      console.log(`Data now stored in ${doc} is now stored on db`);
    })
    .catch(err => {
      console.log(err.message);
    });
};
