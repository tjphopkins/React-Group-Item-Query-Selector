"use strict";

let _ = require('lodash');
let ReactRouter = require('react-router');
let BrowserHistory = ReactRouter.browserHistory;

let ConfigStore = require('../stores/ConfigStore');
let RouterActions = require('../actions/RouterActions');


const _history = BrowserHistory;

class HistoryManager {

    _handleRouteChange(location) {
        if (_.isEmpty(location.query)) {
            let config = ConfigStore.getConfig();
            let selectedItemIds = config.selected_item_ids.join("_");
            // replace the current histroy entry with one including default
            // query params
            _history.replace({
                pathname: location.pathname,
                query: {item_ids: selectedItemIds}
            });
        }
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
