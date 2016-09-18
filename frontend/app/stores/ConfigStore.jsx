"use strict";

let _config = {}

let ConfigStore = {

    init: function(config) {
        _config = config;
    },

    getConfig: function() {
        // Return a clone so that the config can't be to modified externally
        return _.cloneDeep(_config);
    }
}

module.exports = ConfigStore
