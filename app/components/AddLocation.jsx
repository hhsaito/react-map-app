const React = require("react");
const LocationForm = require("../components/LocationForm.jsx");
const axios = require("axios");

const Home_Location = {
  latitude: 29.532804,
  longitude: -55.491477
};

const AddLocation = React.createClass({

  componentWillMount: function() {
    this.setState({
      geocodingError: false,
      verifiedAddress: "",
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
        this.setState({
          verifiedAddress: results[0].formatted_address,
          geocodingError: false,
          lat: results[0].geometry.location.lat(),
          long: results[0].geometry.location.lng()
        });
        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);
        return;
      }
      this.setState({
        verifiedAddress: null,
        geocodingError: true,
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
      baths: postObj.baths,
      otherinfo: postObj.otherinfo,
    });
    var mapElement = this.mapElement;
    this.map = new google.maps.Map(mapElement, {
      zoom: 17
    });
    this.marker = new google.maps.Marker({
      map: this.map
    });
    // geocode the obj
    let newaddress = postObj.address + ' ' + postObj.city + ' ' + postObj.state + ' ' + postObj.zipcode;

    this.geocodeAddress(newaddress);
  },
  handleClick: function(event) {
    event.preventDefault();
    let saveObj = this.state;
    //console.log(this.state)
    axios.post('/add', saveObj)
      .then(() => {
        this.redirectToHome();
      })
      .catch((error) => {
        console.log(error);
      });
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
          {this.state.geocodingError ? <p className="bg-danger">Address not found.</p> : <div><p>Verify location: <strong>{this.state.verifiedAddress}</strong></p>
          <button className="btn btn-secondary" onClick={(e) => this.handleClick(e)}>Save</button></div>}
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
