var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route
var browserHistory = ReactRouter.browserHistory

var AppComponent = require('./AppComponent.jsx')

window.QuerySelector = {
    // Called from index.html
    init: function(el, config) {

        // Some new comment
        console.log("hello");

        // Render the Router component into the DOM into
        // the supplied container element
        ReactDOM.render(
            <Router history={browserHistory}>
                <Route path="/" component={AppComponent}/>
            </Router>
            , el
        )
    }
};
