import { combineReducers } from "redux";

// Import all reducers
import authReducer from "reducers/auth.reducer";
import callReducer from "reducers/call.reducer";

// Export combined reducer
const combinedReducer = combineReducers({
  authReducer,
  callReducer,
})

export default combinedReducer;
