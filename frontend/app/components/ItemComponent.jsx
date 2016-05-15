"use strict";

var React = require('react');

var ItemComponent = React.createClass({

    propTypes: {
        item: React.PropTypes.shape({
            id: React.PropTypes.string, // must be unique
            name: React.PropTypes.string,
        }).isRequired,
        isGroup: React.PropTypes.bool.isRequired,
        isSelected: React.PropTypes.bool.isRequired,
        toggleSelected: React.PropTypes.func.isRequired,
    },

    _handleChange: function(event) {
        this.props.toggleSelected(this.props.item.id);
    },

    render: function() {
        return (
            <div>
                <input type="checkbox"
                       checked={this.props.isSelected}
                       onChange={this._handleChange}
                />
                <label>{`${this.props.item.name}`}</label>
            </div>
        )
    }

})

module.exports = ItemComponent

