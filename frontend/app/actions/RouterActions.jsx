"use strict";

var AppDispatcher = require('../utils/AppDispatcher');
var ActionTypes = require('../constants').ActionTypes;


var RouterActions = {

    changeRoute: function(pathname, query) {
        console.log(pathname, query)
        AppDispatcher.handleRouterAction({
          actionType: ActionTypes.ROUTER_ACTION,
          path: pathname,
          query: query
        });
    },

};

module.exports = RouterActions
