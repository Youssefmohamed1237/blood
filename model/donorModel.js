const mongoose = require("mongoose");
const validator = require("validator");
const { default: isEmail } = require("validator/lib/isEmail");
const donorschema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
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
donorschema.post("init", (doc) => {
  if (doc.profileImg) {
    const imagurl = `${process.env.BASE_URL}/donor/${doc.profileImg}`;
    doc.profileImg = imagurl;
  }
});
const donor = mongoose.model("donor", donorschema);
module.exports = donor;
