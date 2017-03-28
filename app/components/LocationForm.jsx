const React = require("react");

class LocationForm extends React.Component {

  // Form Event Handlers
  handleSubmit(event) {
    event.preventDefault();
    this.props.submitAction(this.state);
  }

  handleUpdateTextInput(event) {
    const newState = {};
    newState[event.target.id] = event.target.value;
    this.setState(newState);
  }

  // handleUpdateBedrooms(newVal) {
  //   this.setState({
  //     bedrooms: newVal
  //   });
  // }

  // handleUpdateBaths(newVal2) {
  //   this.setState({
  //     baths: newVal2
  //   });
  // }

  // Setting Initial State
  initializeState() {
    this.setState({
      address: '',
      city: '',
      state: '',
      zipcode: '',
      bedrooms: '',
      baths: '',
      asking: '',
    });
  }

  // Lifecycle Methods
  componentWillMount() {
    this.initializeState();
  }

  render() {
    return (
      <div>
        <form onSubmit={(event) => this.handleSubmit(event)}>
          <div className='form-row'>
            <label htmlFor='address'>Address</label><br/>
            <input
              defaultValue={this.state.address}
              type='text'
              id='address'
              onChange={(event) => this.handleUpdateTextInput(event)}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='city'>City</label><br/>
            <input
              defaultValue={this.state.city}
              type='text'
              id='city'
              onChange={(event) => this.handleUpdateTextInput(event)}
            />
          </div>
          <div className='form-row'>
            <label htmlFor='state'>State</label><br/>
            <input
              defaultValue={this.state.state}
              type='text'
              id='state'
              onChange={(event) => this.handleUpdateTextInput(event)}
            />
          </div>

          <div className='form-row'>
            <label htmlFor='zipcode'>Zip Code</label><br/>
            <input
              defaultValue={this.state.zipcode}
              type='text'
              id='zipcode'
              onChange={(event) => this.handleUpdateTextInput(event)}
            />
          </div>
        
          <div className='form-row'>
            <label htmlFor='asking'>Asking Price</label><br/>
            <input
              defaultValue={this.state.asking}
              type='text'
              id='asking'
              onChange={(event) => this.handleUpdateTextInput(event)}
            />
          </div>
          <div className='form-row'>
            <button type='submit'>Save</button>
          </div>
        </form>
      </div>
    )
  }
}


// Props for PostForm component
// Requires a "submitAction" function
// optional "loading" boolean value
// optional "defaultTitle" string value
// optional "defaultCategory" string value
// optional "defaultDate" string value
LocationForm.propTypes = {
  submitAction: React.PropTypes.func.isRequired,
  // loading: React.PropTypes.bool,
  // defaultTitle: React.PropTypes.string,
  // defaultCategory: React.PropTypes.string,
  // defaultDate: React.PropTypes.string
};

module.exports = LocationForm;
