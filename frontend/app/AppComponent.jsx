"use strict";

var React = require('react');

var ItemListComponent = require('./components/ItemListComponent')


// Create an App component, extending the React base 'Component' class
var AppComponent = React.createClass({
  render: function() {
    return (
      <div className="item-selector">
            Hello, world! I am a CommentBox.
            <ItemListComponent {...this.props} />
      </div>
    )
  }
})

module.exports = AppComponent  // CommonJS modularize

