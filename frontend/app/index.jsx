"use strict";

var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;

var HistoryManager = require('./utils/HistoryManager');
var ConfigStore = require('./stores/ConfigStore');
var ItemStore = require('./stores/ItemStore');
var AppComponent = require('./AppComponent');

window.QuerySelector = {
    init: function(el, config) {
        console.log("config", config)
        HistoryManager.startListening();
        const history = HistoryManager.getHistory();

        ConfigStore.init(config)

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
