// Include React
import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import { Header } from './Header.jsx';


class Main extends React.Component {

  render() {
    return (
      <div>
        <Header />
        {this.props.children}

      </div>
    )
  }
}

// Export the component back for use in other files
module.exports = Main;