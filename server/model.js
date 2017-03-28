var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PropertiesSchema = new Schema({
  address: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  zipcode: {
    type: Number
  },
  bedrooms: {
    type: Number
  },
  baths: {
    type: Number
  },
  asking: {
    type: Number
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  approved: {
    type: Boolean,
    default: false
  }
});

var Properties = mongoose.model("Properties", PropertiesSchema);
module.exports = Properties;