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

  geocodeAddress: function(address) {
    let self = this
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {

        self.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });

        self.map.setCenter(results[0].geometry.location);
        self.marker.setPosition(results[0].geometry.location);
        console.log(results[0].geometry.location);

        return;
      }

      self.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      self.map.setCenter({
        lat: 41.8962661,
        lng: -87.6186709
      });

      self.marker.setPosition({
        lat: 41.8962661,
        lng: -87.6186709
      });

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

  redirectToHome: function() {
    this.context.router.push('/');
  },

  // Axios post
  saveLocation: function (postObj) {
    axios.post('/add', postObj)
      .then(() => {
        this.redirectToHome();
      })
      .catch((error) => {
        console.log(error);
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
