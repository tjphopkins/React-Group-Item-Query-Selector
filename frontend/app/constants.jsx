"use strict";

// maintain a collection of constants in the form of string literals that can be
// referenced by name
let keyMirror = require('keyMirror');


module.exports = {

    ActionTypes: keyMirror({
        CHANGE_ROUTE: null
    }),

    PayloadSources: keyMirror({
        ROUTER_ACTION: null
    })
}
