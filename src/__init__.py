from flask import Flask
from flask import render_template
import json
app = Flask(__name__)


@app.route('/')
def index():
    """Renders the app template which initialises the React application."""
    config = {
        "items": [
            {
                "id": "1",
                "name": "Item 1",
                "groups": ["3"]
            },
            {
                "id": "2",
                "name": "Item 2",
                "groups": ["4"]
            }
        ],
        "groups": [
            {
                "id": "3",
                "name": "Group 1"
            },
            {
                "id": "4",
                "name": "Group 2"
            },

        ],
        # a saved selection
        "selected_item_ids": ["1", "2"]
    }
    return render_template('index.html', config=json.dumps(config))


if __name__ == '__main__':
    app.run(debug=True)
