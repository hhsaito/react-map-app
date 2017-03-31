const React = require("react");
const LocationForm = require("../components/LocationForm.jsx");
const NewLocation = require("../components/NewLocation.jsx");
const axios = require("axios");
const helpers = require("../utils/helpers");

const Home_Location = {
  latitude: 29.532804,
  longitude: -55.491477
};

const AddLocation = React.createClass({

  componentWillMount: function() {
    this.setState({
      isGeocodingError: false,
      foundAddress: "",
      bedrooms: 1,
      baths: 1
    });
  },

  // redirect after submission
  redirectToHome: function () {
    this.context.router.push('/');
  },

  geocodeAddress: function (address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {
        console.log(results[0])

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false,
          latitude: results[0].geometry.location.lat(),
          longitude: results[0].geometry.location.lng()
        });

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true,

      });

      this.map.setCenter({
        lat: Home_Location.latitude,
        lng: Home_Location.longitude
      });

      this.marker.setPosition({
        lat: Home_Location.latitude,
        lng: Home_Location.longitude
      });

    }.bind(this));
  },
  componentDidMount: function () {

    this.geocoder = new google.maps.Geocoder();

  },

  // Axios post
  checkLocation: function (postObj) {

    this.setState({
      bedrooms: postObj.bedrooms,
      baths: postObj.baths
    });

    var mapElement = this.mapElement;
    this.map = new google.maps.Map(mapElement, {
      zoom: 17
    });

    this.marker = new google.maps.Marker({
      map: this.map
    });
    
    // geocode the obj
    let newaddress = postObj.address + ' ' + postObj.city + ' ';
    newaddress += postObj.state + ' ' + postObj.zipcode;
    console.log(newaddress);
    this.geocodeAddress(newaddress);
  },
  handleClick: function() {
    console.log(this.state)
    // helpers.saveLocation(this.state).then(function() {
    //   redirectToHome();
    // });
  },

  setMapElementReference: function(mapElementReference) {
    this.mapElement = mapElementReference;
  },

  render: function () {
    return (
      <main>
        <h2>Add a Location</h2>
        <LocationForm 
          submitAction={(postObj) => this.checkLocation(postObj)}
          defaultBaths={1}
          defaultBeds={1}
        /> 
        
        <div id="right-div">
          {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : 
          <div><p className="bg-info">Verify location: {this.state.foundAddress}</p>
          <button onClick={(e) => this.handleClick(e)}>Save</button></div>}
          <div className="savemap" ref={this.setMapElementReference}></div>
        </div>
        
      </main>
    )
  }
});

// CreatePost contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
AddLocation.contextTypes = {
  router: React.PropTypes.any
};

module.exports = AddLocation;
