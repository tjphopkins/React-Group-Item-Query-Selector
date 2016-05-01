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

    render: function() {
        return (
            <div>
                <div className="item-selector">
                    {`Hello, world! I am an Item. My name is
                      ${this.props.item.name}.`}
                </div>
                <label>
                {`${this.props.item.name}`}
                <input type="checkbox"
                       checked={this.props.isSelected}
                       onChange={this.props.toggleSelected}
                />
                </label>
            </div>
        )
    }

})

module.exports = ItemComponent  // CommonJS modularize

