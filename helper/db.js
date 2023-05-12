const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose.connect(
    "mongodb+srv://axw:12345678910@cluster0.kxk777i.mongodb.net/computers"
  );
  console.log("MongoDB working");
};

// mongodb://127.0.0.1:27017/computers
