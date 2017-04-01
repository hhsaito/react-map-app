import * as React from 'react';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <header>
        <h1>React Map App</h1>
        <nav>
          <ul>
            <li>
              <Link to='property' activeClassName='active' >
                Map
              </Link>
            </li>
            <li>
              <Link to='add' activeClassName='active'>
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
