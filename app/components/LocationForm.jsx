const React = require("react");

class LocationForm extends React.Component {

  // Form Event Handlers
  handleSubmit(event) {
    event.preventDefault();
    this.props.submitAction(this.state);
  }

  handleUpdates(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // Setting Initial State
  initializeState() {
    this.setState({
      address: '',
      city: '',
      state: '',
      zipcode: '',
      bedrooms: this.props.defaultBeds || 0,
      baths: this.props.defaultBaths || 0,
      otherinfo: '',
    });
  }

  // Lifecycle Methods
  componentWillMount() {
    this.initializeState();
  }

  render() {
    return (
      <div id="left-div">
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className='form-row'>
            <label htmlFor='address'>Address</label><br/>
            <input
              defaultValue={this.state.address}
              type='text'
              id='address'
              onChange={(event) => this.handleUpdates(event)}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='city'>City</label><br/>
            <input
              defaultValue={this.state.city}
              type='text'
              id='city'
              onChange={(event) => this.handleUpdates(event)}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='state'>State</label><br/>
            <input
              defaultValue={this.state.state}
              type='text'
              id='state'
              onChange={(event) => this.handleUpdates(event)}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='zipcode'>Zip Code</label><br/>
            <input
              defaultValue={this.state.zipcode}
              type='text'
              id='zipcode'
              onChange={(event) => this.handleUpdates(event)}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='bedrooms'>Bedrooms</label><br/>
            <select
              defaultValue={this.state.bedrooms}
              style={{ width: 120 }}
              id='bedrooms'
              onChange={(event) => this.handleUpdates(event)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div className='form-row'>
            <label htmlFor='baths'>Baths</label><br/>
            <select
              defaultValue={this.state.baths}
              style={{ width: 120 }}
              id='baths'
              onChange={(event) => this.handleUpdates(event)}
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
            </select>
          </div>
          <div className='form-row'>
            <label htmlFor='otherinfo'>Additional Info</label><br/>
            <input
              defaultValue={this.state.otherinfo}
              type='text'
              id='otherinfo'
              onChange={(event) => this.handleUpdates(event)}
            />
          </div>
          <div className='form-row'>
            <button type='submit'>Find Location</button>
          </div>
        </form>
      </div>
    )
  }
}

// Props for LocationForm component
// Requires a "submitAction" function
LocationForm.propTypes = {
  submitAction: React.PropTypes.func.isRequired,
};

module.exports = LocationForm;
