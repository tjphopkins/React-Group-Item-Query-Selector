"use strict";

var React = require('react');


getStateFromStores = function() {
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

    render: function() {
        // var itemsToRender = []
        // for (item in this.state.items) {
        //     itemsToRender.push(item)
        // }

        return (
          <div className="item-list">
                Hello, I am the item list
          </div>
        )
    }
})

module.exports = ItemListComponent  // CommonJS modularize

