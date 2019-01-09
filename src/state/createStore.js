import { createStore as reduxCreateStore } from "redux"
import rootReducer from '../reducers';

//const store = createStore(rootReducer);
const createStore = () => reduxCreateStore(rootReducer)
export default createStore;