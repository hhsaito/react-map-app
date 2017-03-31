// Include React
import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';


class Main extends React.Component {

  render() {
    return (
      <div>

        <nav className="">
          <ul className="">
            <li><Link to="/add">Add</Link></li>
          </ul>
        </nav>

        {this.props.children}

      </div>
    )
  }
}

// Export the component back for use in other files
module.exports = Main;