const mongoose = require("mongoose");

const Connect = async () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database is connected"))
    .catch((err) => console.log(err));
};

module.exports = Connect;
