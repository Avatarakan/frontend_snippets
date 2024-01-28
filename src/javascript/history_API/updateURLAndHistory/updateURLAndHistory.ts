interface UpdateURLAndHistoryProps<T = Record<string, any>> {
    queryObj?: Record<string, string | number>;
    state?: T | null;
}

/**
 * Get query object and update current location and browser history.
 * @param {UpdateURLAndHistoryProps<T>} props - Object containing the GET query parameters for URL and state for the window.history.
 */
export const updateURLAndHistory = <T = Record<string, any>>({ queryObj = {}, state = null }: UpdateURLAndHistoryProps<T> = {}): void => {
    // Create a new URLSearchParams object from the current window location search parameters
    const query = new URLSearchParams(window.location.search);

    // Update the query parameters with the provided queryObj
    Object.keys(queryObj).forEach((name) => {
        query.set(name, queryObj[name].toString());
    });

    // Generate the new URL with updated query parameters
    const newURL = `${window.location.origin}${window.location.pathname}?${query.toString()}`;

    // Update the browser history with the new state and URL
    window.history.pushState(state || {}, '', newURL);
};
