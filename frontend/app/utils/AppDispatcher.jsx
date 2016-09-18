"use strict";

let Dispatcher = require('flux').Dispatcher;
let assign = require('object-assign');

let PayloadSources = require('../constants').PayloadSources;

// App specific dispatcher based off of flux Dispatcher including register,
// dispatch and waitFor methods
let AppDispatcher = assign(new Dispatcher(), {

  handleRouterAction: function(action) {
    this.dispatch({
      source: PayloadSources.ROUTER_ACTION,
      action: action
    });
  }

});

module.exports = AppDispatcher;
