"use strict";

var React = require('react');
var ReactDOM = require('react-dom');


// Create an App component, extending the React base 'Component' class
var AppComponent = React.createClass({
  render: function() {
    return (
      <div className="commentBox">
            Hello, world! I am a CommentBox.
      </div>
    )
  }
})

module.exports = AppComponent  // CommonJS modularize

