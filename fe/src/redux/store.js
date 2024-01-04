// Importing the createStore function from the "redux" library
import { createStore } from "redux";
// Importing the combined reducer from the "combineReducer" file
import { combineReducer } from "./combineReducer";
// Creating a Redux store by passing the combined reducer to the createStore function
export const store = createStore(
    combineReducer
);
//The resulting store will hold the complete state of the application, with each reducer managing a specific slice of the state.
