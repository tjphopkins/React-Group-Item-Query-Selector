var ReactRouter = require('react-router');
var BrowserHistory = ReactRouter.browserHistory;

const _history = BrowserHistory;
console.log('_history', BrowserHistory)

class HistoryManager {

    _handleRouteChange(location) {
        console.log("change location", location);
    }

    getHistory() {
        return _history;
    }

    startListening() {
        BrowserHistory.listen(this._handleRouteChange);
    }
}

module.exports = new HistoryManager();
