// Include React as a dependency
var React = require("react");

var INITIAL_LOCATION = {
  address: 'London, United Kingdom',
  position: {
    latitude: 51.5085300,
    longitude: -0.1257400
  }
};

var INITIAL_MAP_ZOOM_LEVEL = 8;

var ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};

var PropertyMap = React.createClass({ 

  getInitialState: function() {
  	return {

  	  headers: ["Address","Bedrooms","Baths","Asking Price"],
      data: {"locations":[
        {"address":"2015 West Eastwood Ave.","bedrooms":"4 bedrooms","baths":"2.5 baths","asking":"$724,900"},
        {"address":"2235 W Lawrence Ave. #1","bedrooms":"3 bedrooms","baths":"3 baths","asking":"$439,900"},
        {"address":"2443 W. Winona St.","bedrooms":"5 bedrooms","baths":"2 baths","asking":"$529,900"},
        {"address":"5057 N Francisco Ave.","bedrooms":"5 bedrooms","baths":"4.5 baths","asking":"$859,000"},
        {"address":"4247 N Wolcott Ave.","bedrooms":"6 bedrooms","baths":"3 baths","asking":"$695,000"},
        {"address":"2424 W. Belle Plaine Ave.","bedrooms":"4 bedrooms","baths":"4 baths","asking":"$1,099,000"},
        {"address":"4220 N Mozart St.","bedrooms":"5 bedrooms","baths":"3.5 baths","asking":"$850,000"}
      ]},
      isGeocodingError: false,
      foundAddress: INITIAL_LOCATION.address,

  	};
  },

  geocodeAddress: function(address) {
    this.geocoder.geocode({ 'address': address }, function handleResults(results, status) {

      if (status === google.maps.GeocoderStatus.OK) {

        this.setState({
          foundAddress: results[0].formatted_address,
          isGeocodingError: false
        });

        this.map.setCenter(results[0].geometry.location);
        this.marker.setPosition(results[0].geometry.location);

        return;
      }

      this.setState({
        foundAddress: null,
        isGeocodingError: true
      });

      this.map.setCenter({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

      this.marker.setPosition({
        lat: ATLANTIC_OCEAN.latitude,
        lng: ATLANTIC_OCEAN.longitude
      });

    }.bind(this));
  },

  componentDidMount: function() {

  	var mapElement = this.mapElement;
    
    this.map = new google.maps.Map(mapElement, {
      zoom: INITIAL_MAP_ZOOM_LEVEL,
      center: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.marker = new google.maps.Marker({
      map: this.map,
      position: {
        lat: INITIAL_LOCATION.position.latitude,
        lng: INITIAL_LOCATION.position.longitude
      }
    });

    this.geocoder = new google.maps.Geocoder();

  },

  setMapElementReference: function(mapElementReference) {
    this.mapElement = mapElementReference;
  },

  render: function () {
    return (
      <div>
	      <h2>Locations</h2>
	      {this.state.isGeocodingError ? <p className="bg-danger">Address not found.</p> : <p className="bg-info">{this.state.foundAddress}</p>}
	      <div className="map" ref={this.setMapElementReference}></div>
	      {this.state.data.locations.map(function(locations, i) {
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