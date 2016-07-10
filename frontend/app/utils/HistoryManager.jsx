"use strict";

var ReactRouter = require('react-router');
var BrowserHistory = ReactRouter.browserHistory;

var RouterActions = require('../actions/RouterActions');


const _history = BrowserHistory;

class HistoryManager {

    _handleRouteChange(location) {
        if (location.query.item_ids === "") {
            console.log("in loop");
            selectedItemIds = ConfigStore.getConfig().selected_item_ids.join("_");
            _history.replace(location.pathname, {item_ids: selectedItemIds});
        }
        console.log("query", location.query);
        console.log("pathname", location.pathname);
        RouterActions.changeRoute(location.pathname, location.query);
    }

    getHistory() {
        return _history;
    }

    startListening() {
        BrowserHistory.listen(this._handleRouteChange);
    }
}

module.exports = new HistoryManager();
