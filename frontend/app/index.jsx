"use strict";

var React = require('react')
var ReactDOM = require('react-dom')
var ReactRouter = require('react-router')
var Router = ReactRouter.Router
var Route = ReactRouter.Route


var HistoryManager = require('./HistoryManager')
var AppComponent = require('./AppComponent')

window.QuerySelector = {
    init: function(el, config) {
        HistoryManager.startListening();
        const history = HistoryManager.getHistory();

        // Render the Router component into the DOM into
        // the supplied container element
        ReactDOM.render(
            <Router history={history}>
                <Route path="/" component={AppComponent} />
            </Router>
            , el
        );
    }
}
