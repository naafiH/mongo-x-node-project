const mongoos = require("mongoose");
module.exports = mongoos.connect(process.env.MONGO_URL).then(() => {
  console.log("mongoose connected");
});
