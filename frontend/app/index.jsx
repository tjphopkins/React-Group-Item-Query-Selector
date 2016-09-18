"use strict";

let React = require('react');
let ReactDOM = require('react-dom');
let ReactRouter = require('react-router');
let Router = ReactRouter.Router;
let Route = ReactRouter.Route;

let HistoryManager = require('./utils/HistoryManager');
let ConfigStore = require('./stores/ConfigStore');
let ItemStore = require('./stores/ItemStore');
let AppComponent = require('./AppComponent');

/*
The QuerySelector enables selection of items and groups.
Items can belong to any number of groups, as specified in the
configuration passed from the backend.

If all items in the group are selected, the group is automatically
selected.

If a group is selected, all items in the group are automatically
selected.

On submission of the selection, a new state is pushed to the Router
history, updating the query to reflect the new selection of items.
*/

window.QuerySelector = {
    init: function(el, config) {
        ConfigStore.init(config);
        ItemStore.init(config);

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
};
