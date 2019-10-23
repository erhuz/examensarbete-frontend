import { combineReducers } from "redux";

// Import all reducers
import authReducer from "reducers/auth.reducer";

// Export combined reducer
const combinedReducer = combineReducers({
  authReducer,
})

export default combinedReducer;
