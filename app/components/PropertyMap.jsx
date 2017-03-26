// Include React as a dependency
var React = require("react");

class PropertyMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      headers: ["Address","Bedrooms","Baths","Asking Price"],
      data: {"locations":[
        {"address":"2015 West Eastwood Ave.","bedrooms":"4 bedrooms","baths":"2.5 baths","asking":"$724,900"},
        {"address":"2235 W Lawrence Ave. #1","bedrooms":"3 bedrooms","baths":"3 baths","asking":"$439,900"},
        {"address":"2443 W. Winona St.","bedrooms":"5 bedrooms","baths":"2 baths","asking":"$529,900"},
        {"address":"5057 N Francisco Ave.","bedrooms":"5 bedrooms","baths":"4.5 baths","asking":"$859,000"},
        {"address":"4247 N Wolcott Ave.","bedrooms":"6 bedrooms","baths":"3 baths","asking":"$695,000"},
        {"address":"2424 W. Belle Plaine Ave.","bedrooms":"4 bedrooms","baths":"4 baths","asking":"$1,099,000"},
        {"address":"4220 N Mozart St.","bedrooms":"5 bedrooms","baths":"3.5 baths","asking":"$850,000"}
      ]}
    }
  }

  render() {
    return (
      <div>
	      <h2>Locations</h2>
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
}

module.exports = PropertyMap;