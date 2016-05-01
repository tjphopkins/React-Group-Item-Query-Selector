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

    // Respond to state change after initial render
    componentWillUpdate: function() {
        if (this.state.submit) {
            this.props.history.push({
                pathname: this.props.location.pathname,
                query: {item_ids: this.state.selectedItemIds.join("_")}
            });
        }
    },

    _isItem: function(itemId) {
        if (_.find(this.state.items, function(i) {return i.id == itemId})) {
            return true;
        }
        return false;
    },

    // TODO: Should this method go in the ItemStore?
    _findItemsInGroup: function(groupId) {
        _.filter(this.state.items, function(i) {return groupId in i.groups});
    },

    _isSelected: function(itemId) {
        if (this._isItem(itemId)) {
            return itemId in this.state.selectedItemIds;
        } else {
            var itemsInGroup = this._findItemsInGroup();
            return
                _.every(itemsInGroup, function(i) {return this._isSelected(i)});
        }
    },

    toggleSelected: function(itemId) {
        if (this._isSelected(itemId)) {
            var newSelectedItemIds = [];
            if (this._isItem(itemId)) {
                newSelectedItemIds.push(itemId);
            } else {
                var itemsInGroup = this._findItemsInGroup();
                var itemsInGroupIds = _.map(
                    itemsInGroup, function(i) {return i.id});
                newSelectedItemIds = _.union(
                    [this.state.selectedItemIds, itemsInGroupIds]);

            }
        } else {
            var removeItemIds = [];
            if (this._isItem(itemId)) {
                removeItemIds.push(itemId);
            } else {
                var itemsInGroup = this._findItemsInGroup();
                var itemsInGroupIds = _.map(
                    itemsInGroup, function(i) {return i.id});
                removeItemIds.push(itemsInGroupIds);
            }
            newSelectedItemIds = _.without(
                this.state.selectedItemIds, removeItemIds);

        }
        // this.setState({
        //     selectedItemIds: newSelectedItemIds,
        //     submit: false
        // });
    },

    // submit: function() {
    //     this.setState({
    //         submit: true
    //     });
    // },

    render: function() {
        console.log("context", this.context)
        var itemsToRender = []
        var groupsToRender = []
        for (var item of this.state.items) {
            itemsToRender.push(
                <ItemComponent item={item} key={item.id} isGroup={false}
                               isSelected={this._isSelected(item.id)}
                               toggleSelected={this.toggleSelected}
                />
            );
        }
        for (var group of this.state.groups) {
            groupsToRender.push(
                <ItemComponent item={group} key={group.id} isGroup={true}
                               isSelected={this._isSelected(item.id)}
                               toggleSelected={this.toggleSelected}
                />
            );
        }

        // <button onClick={this.submit()}>Submit</button>
        return (
            <div>
                <div className="group-list">
                    Hello, I am the group list
                    {groupsToRender}
                </div>
                <div className="item-list">
                    Hello, I am the item list
                    {itemsToRender}
                </div>
            </div>
        )
    }
})

module.exports = ItemListComponent  // CommonJS modularize

