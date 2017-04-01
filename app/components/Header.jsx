import * as React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>React Map App</h1>
        <nav className="navbar navbar-toggleable-md navbar-light navbar-inverse bg-primary">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to='property' activeClassName='active' >
                Map
              </Link>
            </li>
            <li>
              <Link className="nav-link" to='add' activeClassName='active'>
                Add a Property
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export { Header };
