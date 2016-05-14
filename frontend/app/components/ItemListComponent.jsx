"use strict";

_ = require('lodash');
var React = require('react');

var ItemStore = require('../stores/ItemStore')
var ItemComponent = require('./ItemComponent')


var getStateFromStores = function() {
    return {
        items: ItemStore.getItems(),
        groups: ItemStore.getGroups(),
        selectedItemIds: ItemStore.getSelectedItems(),
        groupItemIdMap: ItemStore.getGroupItemIdMap(),
        submit: false
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

    // Responds to changes in state that occur after initial render
    componentWillUpdate: function(newProps, newState) {
        if (newState.submit) {
            this.props.history.push({
                pathname: this.props.location.pathname,
                query: {item_ids: newState.selectedItemIds.join("_")}
            });
        }
    },

    _isItem: function(itemId) {
        if (_.find(this.state.items, function(i) {return i.id == itemId})) {
            return true;
        }
        return false;
    },

    _isSelected: function(itemId) {
        if (this._isItem(itemId)) {
            return this.state.selectedItemIds.indexOf(itemId) != -1;
        } else {
            var itemsInGroupIds = this.state.groupItemIdMap[itemId];
            // TODO: Is there a nicer way of making 'this' available inside
            // anon fn?
            var self = this;
            return _.every(
                itemsInGroupIds, function(i) {return self._isSelected(i)});
        }
    },

    toggleSelected: function(itemId) {
        if (!this._isSelected(itemId)) {
            if (this._isItem(itemId)) {
                var newSelectedItemIds = _.clone(this.state.selectedItemIds)
                newSelectedItemIds.push(itemId);
            } else {
                var itemsInGroupIds = this.state.groupItemIdMap[itemId];
                var newSelectedItemIds = _.union(
                    this.state.selectedItemIds, itemsInGroupIds);

            }
        } else {
            if (this._isItem(itemId)) {
                var removeItemIds = [itemId];
            } else {
                var removeItemIds = this.state.groupItemIdMap[itemId];
            }
            newSelectedItemIds = _.difference(
                this.state.selectedItemIds, removeItemIds);

        }
        this.setState({
            selectedItemIds: newSelectedItemIds,
            submit: false
        });
    },

    submit: function() {
        this.setState({
            submit: true
        });
    },

    render: function() {
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
                               isSelected={this._isSelected(group.id)}
                               toggleSelected={this.toggleSelected}
                />
            );
        }

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
                <button onClick={this.submit}>Go!</button>
            </div>
        )
    }
})

module.exports = ItemListComponent  // CommonJS modularize

