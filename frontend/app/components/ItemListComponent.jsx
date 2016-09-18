"use strict";

_ = require('lodash');
let React = require('react');

let ItemStore = require('../stores/ItemStore');
let ItemComponent = require('./ItemComponent');
let SearchComponent = require('./SearchComponent');


let getStateFromStores = function() {
    return {
        items: ItemStore.getItems(),
        groups: ItemStore.getGroups(),
        selectedItemIds: ItemStore.getSelectedItems(),
        groupItemIdMap: ItemStore.getGroupItemIdMap(),
        submit: false,
        filterText: null
    }
}

let ItemListComponent = React.createClass({

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
        let newState = getStateFromStores();
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
            let itemsInGroupIds = this.state.groupItemIdMap[itemId];
            // TODO: Is there a nicer way of making 'this' available inside
            // anon fn?
            let self = this;
            return _.every(
                itemsInGroupIds, function(i) {return self._isSelected(i)});
        }
    },

    toggleSelected: function(itemId) {
        let newSelectedItemIds = [];
        if (!this._isSelected(itemId)) {
            if (this._isItem(itemId)) {
                newSelectedItemIds = _.clone(this.state.selectedItemIds)
                newSelectedItemIds.push(itemId);
            } else {
                let itemsInGroupIds = this.state.groupItemIdMap[itemId];
                newSelectedItemIds = _.union(
                    this.state.selectedItemIds, itemsInGroupIds);

            }
        } else {
            let removeItemIds = [];
            if (this._isItem(itemId)) {
                removeItemIds = [itemId];
            } else {
                removeItemIds = this.state.groupItemIdMap[itemId];
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
        let itemsToRender = []
        let groupsToRender = []

        for (let item of this.state.items) {
            if (this._isFilteredOut(item)) {
                continue;
            }
            itemsToRender.push(
                <ItemComponent item={item} key={item.id} isGroup={false}
                               isSelected={this._isSelected(item.id)}
                               isGroup={false}
                               toggleSelected={this.toggleSelected}
                />
            );
        }

        if (itemsToRender.length == 0) {
            itemsToRender.push(
                <p key="para">No items matching your search</p>
            )
        }

        for (let group of this.state.groups) {
            if (this._isFilteredOut(group)) {
                continue;
            }
            groupsToRender.push(
                <ItemComponent item={group} key={group.id} isGroup={true}
                               isSelected={this._isSelected(group.id)}
                               isGroup={true}
                               toggleSelected={this.toggleSelected}
                />
            );
        }

        if (groupsToRender.length == 0) {
            groupsToRender.push(
                <p key="para">No groups matching your search</p>
            );
        }

        return (
            <ul className="selector-menu">
                <li className="clear-selection"
                      onClick={this.clearSelectedItems}>
                    Clear Selection</li>
                <li>
                    <SearchComponent
                        filterItems={this.filterItems}
                        numberItems={this.state.items.length}
                        numberGroups={this.state.items.length} />
                </li>
                <li className="divider" />
                <li className="group-list">
                    {groupsToRender}
                </li>
                <li className="divider" />
                <li className="item-list">
                    {itemsToRender}
                </li>
                <li className="divider" />
                <li className="submit-selection">
                    <button onClick={this.submit}>
                        Submit
                    </button>
                </li>
            </ul>
        )
    }
})

module.exports = ItemListComponent

