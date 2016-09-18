"use strict";

let React = require('react');


let ItemComponent = React.createClass({

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
        let className = "item";
        if (this.props.isGroup) {
            className += " group";
        }

        return (
            <div className={className}>
                <input type="checkbox"
                       checked={this.props.isSelected}
                       onChange={this._handleChange}
                />
                <label>{`${this.props.item.name}`}</label>
            </div>
        )
    }

});

module.exports = ItemComponent;

