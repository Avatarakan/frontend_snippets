# Update URL and Browser History

This utility function updates the current URL's query parameters and pushes a new entry to the browser history using the browser's history API.

## Usage

```javascript
// Usage example
import updateURLAndHistory from './path-to-file/updateURLAndHistory';

// Update query parameters and browser history
const queryParams = { key1: 'value1', key2: 42 };
const historyState = { someState: 'exampleState' };

updateURLAndHistory(queryParams, historyState);
```

## Function Details
### Parameters:

- *queryParams*: Object containing the GET query parameters to be updated in the URL.
- *state*: Object containing state for the window.history.
Behavior:

The function updates the current URL's query parameters with the provided queryParams.
It then uses the browser's history API to push a new entry with the updated state and URL.
