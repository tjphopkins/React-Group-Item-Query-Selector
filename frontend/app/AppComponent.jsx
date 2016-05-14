"use strict";

var React = require('react');

var ItemListComponent = require('./components/ItemListComponent')


// Create an App component, extending the React base 'Component' class
var AppComponent = React.createClass({
    render: function() {
        return (
            <div className="item-selector">
                {/*
                 history and location are made available as props of this
                 component by the Router. It is important we pass these down to
                 the ItemListComponent. For simplicity we pass down all props.
                 */}
                <ItemListComponent {...this.props} />
            </div>
        )
    }
})

module.exports = AppComponent  // CommonJS modularize

