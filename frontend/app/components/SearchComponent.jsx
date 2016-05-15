"use strict";

var React = require('react');

var SearchComponent = React.createClass({

    propTypes: {
        filterItems: React.PropTypes.func.isRequired,
        numberItems: React.PropTypes.number,
        numberGroups: React.PropTypes.number,
    },

    _filter: function(event) {
        var filterText = document.getElementsByName(
            "filterItems")[0].value;
        this.props.filterItems(filterText);
    },

    render: function() {
        return (
            <div className="search-box">
                <input
                    type="text" name="filterItems"
                    onKeyUp={this._filter}
                    placeholder={`Search ${this.props.numberGroups} groups`
                    + ` and ${this.props.numberItems} items`}
                />
            </div>
        )
    }

})

module.exports = SearchComponent

