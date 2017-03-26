// Include React
import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';


class Main extends React.Component {

  render() {
    return (
      <div>

        {this.props.children}

      </div>
    )
  }
}

// Export the component back for use in other files
module.exports = Main;