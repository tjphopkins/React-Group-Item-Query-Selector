"use strict";

let AppDispatcher = require('../utils/AppDispatcher');
let ActionTypes = require('../constants').ActionTypes;


let RouterActions = {

    changeRoute: function(pathname, query) {
        AppDispatcher.handleRouterAction({
          actionType: ActionTypes.CHANGE_ROUTE,
          path: pathname,
          query: query
        });
    },

};

module.exports = RouterActions
