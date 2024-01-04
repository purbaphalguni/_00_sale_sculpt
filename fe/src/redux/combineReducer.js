// Importing the combineReducers function from the "redux" library
import { combineReducers } from "redux";
// Importing the userReducer from the "userReducer" file
import { userReducer } from "./userReducer";
// Creating a combined reducer using combineReducers
// The key "userReducer" in the object specifies the slice of the state managed by the userReducer
export const combineReducer = combineReducers({ userReducer: userReducer });
