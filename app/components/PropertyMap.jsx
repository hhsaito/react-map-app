// Include React as a dependency
const React = require("react");
// Include the Helper (for the saved properties)
const axios = require("axios");

const INITIAL_LOCATION = {
  address: '339 E Chicago Ave, Chicago, IL 60611',
  position: {
    latitude: 41.8962661,
    longitude: -87.6186709
  }
};

const INITIAL_MAP_ZOOM_LEVEL = 10;

const ATLANTIC_OCEAN = {
  latitude: 29.532804,
  longitude: -55.491477
};
let imageUrl = 'http://chart.apis.google.com/chart?cht=mm&chs=24x32&' +
          'chco=FFFFFF,008CFF,000000&ext=.png';
let markerClusterer = null;

const PropertyMap = React.createClass({ 

  getInitialState: function() {
  	return {
      propertydata: [],
      // do something

      //with this
      foundAddress: INITIAL_LOCATION.address,
  	};
  },

  getProperties: function() {
    return axios.get("/properties")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  markMap: function(map, propertyData) {
      let markers = [];
      if (markerClusterer) {
        markerClusterer.clearMarkers();
      }
      let markerImage = new google.maps.MarkerImage(imageUrl,
        new google.maps.Size(24, 32));

      for (let i = 0; i < propertyData.data.length; ++i) {
        console.log(propertyData.data[i].lat);
        let latLng = new google.maps.LatLng(propertyData.data[i].lat,
            propertyData.data[i].long)
        let marker = new google.maps.Marker({
           position: latLng,
           draggable: true,
           icon: markerImage
        });
        markers.push(marker);
      }
      markerClusterer = new MarkerClusterer(this.map, markers, {
        gridSize: 30,
      });
  },

  componentDidMount: function() {
    let self = this;
    let mapElement = self.mapElement;

    self.getProperties().then(function(propertyData) {
      self.setState({ propertydata: propertyData.data });
      self.map = new google.maps.Map(mapElement, {
        zoom: INITIAL_MAP_ZOOM_LEVEL,
        center: {
          lat: INITIAL_LOCATION.position.latitude,
          lng: INITIAL_LOCATION.position.longitude
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      });
      /* add these listeners via React */
      /*
      google.maps.event.addDomListener(self.map, 'idle', function() {
        center = map.getCenter();
      });

      google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(center);
      });

      google.maps.event.addListener(self.map, 'zoom_changed', function() {
        if (map.getZoom() < minZoomLevel) map.setZoom(minZoomLevel);
      });
*/
      self.geocoder = new google.maps.Geocoder();
      self.markMap(self.map, propertyData);
    });
  },

  setMapElementReference: function(mapElementReference) {
    this.mapElement = mapElementReference;
  },

  render: function () {
    return (
      <div>
	      <h2>Locations</h2>
	      <div className="map" ref={this.setMapElementReference}></div>
	      {this.state.propertydata.map(function(locations, i) {
	        return (
	          <p key={i}>{locations.verifiedAddress}, {locations.bedrooms} bedrooms, {locations.baths} baths</p>
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