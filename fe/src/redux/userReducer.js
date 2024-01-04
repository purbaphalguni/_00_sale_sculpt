// Initial state for the userReducer
const initialState = {
    user: {}
}
// Reducer function for managing user-related state
export const userReducer = (state = initialState, action) => {
    // Switch statement to handle different action types
    switch (action.type) {
        // Case for handling a successful login
        case "LOGIN_SUCCESS":
            // Return a new state with updated user information from the action payload
            return {
                ...state,
                user: action.payload
            };
        // Case for handling a login error
        case "LOGIN_ERROR":
            // Reset the state to the initial state, clearing user information
            return initialState;
        // Default case for handling unknown or unhandled actions
        default:
            // Return the current state unchanged for any unknown or unhandled actions.
            return state;
    }
}
