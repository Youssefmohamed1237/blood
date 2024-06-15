const mongoose = require("mongoose");
const validator = require("validator");
const needschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    // unique: true,
    validate: [validator.isEmail, "email should be valid"],
  },
  name: {
    type: String,
    required: [true, "please enter the name"],
  },
  profileImg: {
    type: String,
    // required: [true, "profile image is required"],
  },

  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return validator.isMobilePhone(v, "ar-EG");
      },
      message: "not valid  mobile phone",
    },
  },
  bloodType: {
    type: String,
    required: true,
    enum: {
      values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
      message: "blood type is not sutiable",
    },
  },
  city: {
    type: String,
    required: [true, "city is required"],
  },

  message: {
    type: String,
  },
});
needschema.post("init", (doc) => {
  if (doc.profileImg) {
    const imagurl = `${process.env.BASE_URL}/need/${doc.profileImg}`;
    doc.profileImg = imagurl;
  }
});
const need = mongoose.model("need", needschema);
module.exports = need;
