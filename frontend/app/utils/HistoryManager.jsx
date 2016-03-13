"use strict";

var _ = require('lodash')
var ReactRouter = require('react-router');
var BrowserHistory = ReactRouter.browserHistory;

var ConfigStore = require('../stores/ConfigStore');
var RouterActions = require('../actions/RouterActions');


const _history = BrowserHistory;

class HistoryManager {

    _handleRouteChange(location) {
        if (_.isEmpty(location.query)) {
            var config = ConfigStore.getConfig();
            var selectedItemIds = config.selected_item_ids.join("_");
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
