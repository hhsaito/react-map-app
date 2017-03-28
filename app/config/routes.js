var React = require("react");
var router = require("react-router");

// Include the Route component
var Route = router.Route;
//  Include the IndexRoute (catch-all route)
var IndexRoute = router.IndexRoute;

// Include the Router component
var Router = router.Router;

// Include the browserHistory prop to configure client side routing
// https://github.com/ReactTraining/react-router/blob/master/docs/guides/Histories.md#browserhistory
var browserHistory = router.browserHistory;

// Reference the high-level components
var Main = require("../components/Main.jsx");
var PropertyMap = require("../components/PropertyMap.jsx");
var AddLocation = require("../components/AddLocation.jsx");

// Export the Routes
module.exports = (
  // High level component is the Router component.
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path='property' component={PropertyMap} />
      <Route path='add' component={AddLocation} />
      <IndexRoute component={PropertyMap} />
    </Route>
  </Router>
);
