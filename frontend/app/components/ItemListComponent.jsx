"use strict";

_ = require('lodash');
var React = require('react');

var ItemStore = require('../stores/ItemStore')
var ItemComponent = require('./ItemComponent')


var getStateFromStores = function() {
    return {
        items: ItemStore.getItems(),
        groups: ItemStore.getGroups(),
        selectedItemIds: ItemStore.getSelectedItems()
    }
}

// Create an App component, extending the React base 'Component' class
var ItemListComponent = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    componentDidMount: function() {
        ItemStore.addChangeListener(this._onChange);
    },

    componentWillUnmount: function() {
        ItemStore.removeChangeListener(this._onChange);
    },

    _onChange: function() {
        var newState = getStateFromStores();
        if (! _.isEqual(newState, this.state)) {
            this.setState(newState);
        }

    },

    _currentSelectedItemIds: @state.selectedItemIds;

    _isItem: function(itemId) {
        if (_.find(@state.items, function(i) {return i.id == itemId})) {
            return true;
        }
        return false;
    },

    // TODO: Should this method go in the ItemStore?
    _findItemsInGroup: function(groupId) {
        _.filter(@state.items, function(i) {return groupId in i.groups}));
    }

    _isSelected: function(itemId) {
        if (this._isItem(itemId)) {
            return itemId in this._currentSelectedItemIds;
        } else {
            var itemsInGroup = this._findItemsInGroup();
            return \
                _.every(itemsInGroup, function(i) {return this._isSelected(i)};
        }
    },

    toggleSelected: function(itemId) {
        if (this._isItem(itemId)) {
            this._currentSelectedItemIds.push(itemId);
        } else {
            var itemsInGroup = this._findItemsInGroup();
            var itemsInGroupIds = _.map(itemsInGroup, function(i) {return i.id};
            // TODO : Add new ones only
            this._currentSelectedItemIds = _.union(
                [this._currentSelectedItemIds, itemsInGroupIds]);

        }
        this.setState({
            selectedItemIds: this._currentSelectedItemIds
        });
    },

    submit: function() {}

    render: function() {

        var itemsToRender = []
        var groupsToRender = []
        for (item of this.state.items) {
            itemsToRender.push(
                <ItemComponent item={item} key={item.id} />
            );
        }
        for (group of this.state.groups) {
            groupsToRender.push(
                <ItemComponent item={group} key={group.id} />
            );

        return (
            <div className="group-list">
                Hello, I am the group list
                {groupsToRender}
            </div>
            <div className="item-list">
                Hello, I am the item list
                {itemsToRender}
            </div>
        )
    }
})

module.exports = ItemListComponent  // CommonJS modularize

