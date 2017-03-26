var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var propertiesSchema = new Schema({
  address: {
    type: String
  },
  bedrooms: {
    type: String
  },
  baths: {
    type: String
  },
  asking: {
    type: String
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  date: {
    type: Date
  }
  approved: {
    type: Boolean,
    default: false
  }
});

var Properties = mongoose.model("Properties", PropertiesSchema);
module.exports = Properties;