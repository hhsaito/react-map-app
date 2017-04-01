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
      centerLat: '',
      centerLng: ''
  	};
  },
  // Axios call to get data
  getProperties: function() {
    return axios.get("/properties")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // Take marker data and set for clusters
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
           map: map,
           draggable: true,
           icon: markerImage
           //institution: locations[i].institution
        });
        google.maps.event.addListener(marker, 'click', (function(marker, index) {
          return function(){
            console.log(propertyData.data[i]);
            map.setCenter(marker.position);
            map.setZoom(15);
            let infowindow = new google.maps.InfoWindow({
              content: propertyData.data[i].otherinfo
            });
            infowindow.open(map,marker);
          }
        })(marker, i));
        markers.push(marker);
      }
      markerClusterer = new MarkerClusterer(this.map, markers, {
        gridSize: 30,
      });
  },
  handleClick: function(item) {
    this.map.setCenter({ lat: item.lat, lng: item.long });
    this.map.setZoom(15);
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

      return
    });
  },

  setMapElementReference: function(mapElementReference) {
    this.mapElement = mapElementReference;
  },

  render: function () {
    return (
      <div className="clearFloat">
	      <div className="map" ref={this.setMapElementReference}></div>
        <h2>Locations</h2>
	      {this.state.propertydata.map(function(locations, i) {
	        return (
	          <div key={i} className="view-properties"><p><button className="btn btn-secondary" onClick={() => this.handleClick(locations)}>View</button>  {locations.verifiedAddress}, {locations.bedrooms} bedrooms, {locations.baths} baths </p>
            </div>
	        );
	      }, this )}
	      
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