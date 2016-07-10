var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var AppDispatcher = require('../utils/AppDispatcher');
var ActionTypes = require('../constants').ActionTypes;


var CHANGE_EVENT = 'change';

// New object with EventEmitter methods e.g. emit, on and removeListener
var ItemStore = assign({}, EventEmitter.prototype, {

    // Synchronously calls each of the listeners registered by components for the
    // change event
    emitChange: function() {
        this.emit(CHANGE_EVENT);
    },

    // Method for components to register their listener function for the change
    // event
    addChangeListener: function(callback) {
        this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    _items: {},
    _groups: {},
    _selectedItemIds: {},

    init: function(config) {
        this._items = config.items;
        // Should not change throughout lifetime of app
        Object.freeze(this._items);

        this._groups = config.groups;
        Object.freeze(this._groups);
    },

    getItems: function() {
        return this._items;
    },

    getGroups: function() {
        return this_groups;
    },

    _setSelectedItems: function(selectedItemIds) {
        this._selectedItemIds = selectedItemIds
    },

    _routeChanged: function(query) {
        var selectedItemIds
        if (query.hasOwnProperty('item_ids')) {
            if (query.items_ids === "") {
                selectedItemIds = [];
            }
        } else {
            selectedItemIds = query.item_ids.split('_');
        }
        this._setSelectedItems(selectedItemIds);
    }

});

ItemStore.dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
      case ActionTypes.CHANGE_ROUTE:
        this._routeChanged(action.query);

    }

    ItemStore.emitChange();

    return true; // required by promise in Dispatcher
})

module.exports = ItemStore;
