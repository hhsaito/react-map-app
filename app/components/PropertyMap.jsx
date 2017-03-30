// Include React as a dependency
var React = require("react");
// Include the Helper (for the saved properties)
var helpers = require("../utils/helpers");

var INITIAL_LOCATION = {
  address: '339 E Chicago Ave, Chicago, IL 60611',
  position: {
    latitude: 41.8962661,
    longitude: -87.6186709
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 15;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

var PropertyMap = React.createClass({ 

  getInitialState: function() {
  	return {
      propertydata: [],
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address,
  	};
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

        return;
      }

      self.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      self.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

      self.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

    });
  },

  componentDidMount: function() {
    let self = this;
  	var mapElement = self.mapElement;
    
    self.map = new google.maps.Map(mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    self.marker = new google.maps.Marker({
      map: self.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    self.geocoder = new google.maps.Geocoder();
  
    helpers.getProperties().then(function(propertyData) {
      self.setState({ propertydata: propertyData.data });
      console.log("property results", propertyData);
    });

  },

  

  render: function () {
    return (
      <div>
	      <h2>Locations</h2>
	      {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}
	      <div className="map" ref={this.setMapElementReference}></div>
	      {this.state.propertydata.map(function(locations, i) {
	        return (
	          <p key={i}>{locations.address}, {locations.bedrooms}</p>
	        );
	      })}
	      
      </div>
      // React.DOM.table(null,
      //   React.DOM.thead(null,
      //     React.DOM.tr(null,
      //       this.state.headers.map(function(title, idx) {
      //         return React.DOM.th({key: idx}, title);
      //       })
      //     )
      //   ),
      //   React.DOM.tbody(null,
      //     this.state.data.map(function (row, idx) {
      //       return (
      //         React.DOM.tr({key: idx},
      //           row.map(function (cell, idx) {
      //             return React.DOM.td({key: idx}, cell);
      //           })
      //         )
      //       );
      //     })
      //   )
      // )
    );
  }
});

module.exports = PropertyMap;