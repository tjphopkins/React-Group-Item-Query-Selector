"use strict";

let React = require('react');

let ItemListComponent = require('./components/ItemListComponent');


let AppComponent = React.createClass({
    render: function() {
        return (
            // history and location are made available as props of this
            // component by the Router. It is important we pass these down to
            // the ItemListComponent. For simplicity we pass down all props.
            <ItemListComponent {...this.props} />
        );
    }
});

module.exports = AppComponent;
