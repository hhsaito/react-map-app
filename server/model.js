var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PropertiesSchema = new Schema({
  verifiedAddress: {
    type: String,
    unique: true
  },
  bedrooms: {
    type: Number
  },
  baths: {
    type: Number
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  otherinfo: {
    type: String
  },
  approved: {
    type: Boolean,
    default: false
  }
});

var Properties = mongoose.model("Properties", PropertiesSchema);
module.exports = Properties;