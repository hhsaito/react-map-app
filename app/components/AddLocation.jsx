const React = require("react");
const LocationForm = require("../components/LocationForm.jsx");
const axios = require("axios");

class AddLocation extends React.Component {

  // redirect after submission
  redirectToHome() {
    this.context.router.push('/');
  }

  // Axios post
  addLocation(postObj) {
    axios.post('/add', postObj)
      .then(() => {
        this.redirectToHome();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h2>New Post</h2>
        <LocationForm submitAction={(postObj) => this.addLocation(postObj)}/>
      </div>
    )
  }
}

// CreatePost contextTypes
// Needed to get reference to router context
// so that we can redirect the user programmatically
// with react router.
AddLocation.contextTypes = {
  router: React.PropTypes.any
};

module.exports = AddLocation;
