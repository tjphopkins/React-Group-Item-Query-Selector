"use strict";

_ = require('lodash');
var React = require('react');

var ItemStore = require('../stores/ItemStore');
var ItemComponent = require('./ItemComponent');
var SearchComponent = require('./SearchComponent');


var getStateFromStores = function() {
    return {
        items: ItemStore.getItems(),
        groups: ItemStore.getGroups(),
        selectedItemIds: ItemStore.getSelectedItems(),
        groupItemIdMap: ItemStore.getGroupItemIdMap(),
        submit: false,
        filterText: null
    }
}

var ItemListComponent = React.createClass({

    getInitialState: function() {
        return getStateFromStores();
    },

    // Immediately after initial render, register a listener function for when
    // ItemStore emits a change
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

    filterItems: function(filterText) {
        this.setState({
            filterText: filterText.toLowerCase()
        });
    },

    _isFilteredOut: function(item) {
        return (this.state.filterText &&
            item.name.toLowerCase().indexOf(this.state.filterText) < 0)
    },

    clearSelectedItems: function() {
        this.setState({
            selectedItemIds: [],
            submit: false
        });
    },

    render: function() {
        var itemsToRender = []
        var groupsToRender = []
        for (var item of this.state.items) {
            if (this._isFilteredOut(item)) {
                continue;
            }
            itemsToRender.push(
                <ItemComponent item={item} key={item.id} isGroup={false}
                               isSelected={this._isSelected(item.id)}
                               toggleSelected={this.toggleSelected}
                />
            );
        }
        for (var group of this.state.groups) {
            if (this._isFilteredOut(group)) {
                continue;
            }
            groupsToRender.push(
                <ItemComponent item={group} key={group.id} isGroup={true}
                               isSelected={this._isSelected(group.id)}
                               toggleSelected={this.toggleSelected}
                />
            );
        }

        return (
            <div className="selector-container">
                <span onClick={this.clearSelectedItems}>Clear Selection</span>
                <SearchComponent
                    filterItems={this.filterItems}
                    numberItems={this.state.items.length}
                    numberGroups={this.state.items.length} />
                <div className="group-list">
                    {groupsToRender}
                </div>
                <span className="divider" />
                <div className="item-list">
                    {itemsToRender}
                </div>
                <div className="submit-selection">
                    <button onClick={this.submit}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
})

module.exports = ItemListComponent

