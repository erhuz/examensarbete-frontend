import { combineReducers } from "redux";

// Import all reducers
import tokenReducer from "reducers/auth.reducer";

// Export combined reducer
const combinedReducer = combineReducers({
  tokenReducer,
})

export default combinedReducer;
