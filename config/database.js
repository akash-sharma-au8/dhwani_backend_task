const mongoose = require("mongoose");
const config = require("config");
const databaseURI = config.get("database_uri");

const connectDB = async () => {
  try {
    await mongoose.connect(databaseURI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex:true
    });

    console.log("Database connected");
  } catch (err) {
    console.log(err.message);
    // shut down the server because of failure
    process.exit(1);
  }
};

module.exports = connectDB;
