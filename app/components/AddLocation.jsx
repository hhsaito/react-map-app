const React = require("react");
const LocationForm = require("../components/LocationForm.jsx");
const axios = require("axios");

class AddLocation extends React.Component {

  // Create Post User Feedback

  redirectToHome() {
    this.context.router.push('/');
  }

  // sendSuccessNotification() {
  //   notification['success']({
  //     message: 'Yayyy!!',
  //     description: 'Your post has been created.',
  //   });
  // }

  // sendErrorNotification() {
  //   notification['error']({
  //     message: 'Uh Oh',
  //     description: 'Something went wrong, please try again.',
  //   });
  // }

  // Data Request Methods

  addLocation(postObj) {
    axios.post('/add', postObj)
      .then(() => {
        this.redirectToHome();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  createPost(postObj) {
    this.startLoading();
    axios.post('/posts', postObj)
      .then(() => {
        this.sendSuccessNotification();
        this.endLoading();
        this.redirectToPosts();
      })
      .catch((error) => {
        this.sendErrorNotification();
        this.endLoading();
      });
  }

  // Setting Initial State

  // initializeState() {
  //   this.setState({
  //     loading: false
  //   });
  // }

  // // Lifecycle Methods

  // componentWillMount() {
  //   this.initializeState();
  // }

  render() {
    return (
      <div>
        <h2>New Post</h2>
        <LocationForm
          // loading={this.state.loading}
          submitAction={(postObj) => this.addLocation(postObj)}
          // defaultTitle={'Foobar'}
          // defaultCategory={'Programming'}
          // defaultDate={'2017-03-05'}
        />
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
