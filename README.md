# Group Query Selector

The Group Query Selector enables selection of items and groups.
Items can belong to any number of groups, as specified in the
configuration passed from the backend.

If all items in the group are selected, the group is automatically
selected.

If a group is selected, all items in the group are automatically
selected.

On submission of the selection, a new state is pushed to the Router
history, updating the query to reflect the new selection of items.

# Install
* Run `pip install requirements.txt`
* Inside ./frontend, run `npm install` followed by `npm run build`
* Inside ./src, run `python __init__.py` and note the localhost port number
that the Flask development server is running on.
