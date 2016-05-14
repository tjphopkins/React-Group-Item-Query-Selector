var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var _ = require('lodash')

var AppDispatcher = require('../utils/AppDispatcher');
var ActionTypes = require('../constants').ActionTypes;


var CHANGE_EVENT = 'change';

// New object with EventEmitter methods e.g. emit, on and removeListener
var ItemStore = assign({}, EventEmitter.prototype, {

    // Synchronously calls each of the listeners registered by components for
    // the change event
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
    _groupItemIdMap: {},

    init: function(config) {
        this._items = config.items;
        // Should not change throughout lifetime of app
        Object.freeze(this._items);

        this._groups = config.groups;
        Object.freeze(this._groups);

        this._setGroupItemIdsMap();
        Object.freeze(this._groupItemIdMap);
    },

    getItems: function() {
        return this._items;
    },

    getGroups: function() {
        return this._groups;
    },

    getSelectedItems: function() {
        return _.clone(this._selectedItemIds);
    },

    _setSelectedItems: function(selectedItemIds) {
        this._selectedItemIds = selectedItemIds
    },


    getGroupItemIdMap: function() {
        return _.clone(this._groupItemIdMap);
    },

    _setGroupItemIdsMap: function() {
        for (var group of this._groups) {
            var groupId = group.id;
            var itemsInGroup = _.filter(this._items, function(i) {
                return i.groups.indexOf(groupId) != -1});
            this._groupItemIdMap[groupId] = _.map(
                itemsInGroup, function(i) {return i.id});
        }
    },

    _routeChanged: function(query) {
        var selectedItemIds
        if (query.hasOwnProperty('item_ids')) {
            if (query.items_ids === "") {
                selectedItemIds = [];
            } else {
            selectedItemIds = query.item_ids.split('_');
            }
            this._setSelectedItems(selectedItemIds);
        }
    }

});

ItemStore.dispatcherIndex = AppDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case ActionTypes.CHANGE_ROUTE:
            ItemStore._routeChanged(action.query);

    }

    ItemStore.emitChange();

    return true; // required by promise in Dispatcher
})

module.exports = ItemStore;
