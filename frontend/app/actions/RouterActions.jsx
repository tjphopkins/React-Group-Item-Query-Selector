"use strict";

var AppDispatcher = require('../utils/AppDispatcher');
var ActionTypes = require('../constants').ActionTypes;


var RouterActions = {

    changeRoute: function(pathname, query) {
        AppDispatcher.handleRouterAction({
          actionType: ActionTypes.CHANGE_ROUTE,
          path: pathname,
          query: query
        });
    },

};

module.exports = RouterActions
