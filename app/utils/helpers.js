// Include the Axios library for HTTP requests
var axios = require("axios");
// var geocoder = require("geocoder");

// Helper Functions
var helpers = {

  // This will return any saved articles from our database
  getProperties: function() {
    return axios.get("/properties")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },

  

  // This will save new articles to our database
  postSaved: function(title, date, url) {
    var newLocation = { 
      address: address, 
      city: city, 
      state: state,
      zipcode: zipcode,
      bedrooms: bedrooms, 
      baths: baths, 
      asking: asking, 
      latitude: latitude,
      longitude: longitude
    };
    return axios.post("/api/add", newLocation)
      .then(function(response) {
        console.log("axios results", response.data._id);
        return response.data._id;
      });
  },
  // This will remove saved articles from our database
  deleteSaved: function(title, data, url) {
    return axios.delete("/api/saved", {
      params: {
        "title": title,
        "data": data,
        "url": url
      }
    })
    .then(function(results) {
      console.log("axios results", results);
      return results;
    });
  }
};


// We export the helpers function
module.exports = helpers;
