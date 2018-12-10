import { createStore, combineReducers } from 'redux';

// import reducers
import { ButtonCounterReducer } from './Reducers/ButtonCounterReducer';

// combine reducers here
const reducers = combineReducers({
	buttonCounter: ButtonCounterReducer
});

const canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);

const preloadedState = () => {
	if (canUseDOM) {
		return window.__PRELOADED_STATE__;
	}
};

// Allow the passed state to be garbage-collected
// if (canUseDOM) {
// 	delete window.__PRELOADED_STATE__;
// }

// create store
export default () => {
	return createStore(reducers, preloadedState()); // second argument is optional
};

// export default () => {
// 	return createStore(reducers, window.__PRELOADED_STATE__, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()); // second argument is optional
// };

/**
 * createStore(reducer, [preloadedState], [enhancer])
 * reducer (Function): A reducing function that returns the next state tree, given the current state tree
 *  and an action to handle.

* [preloadedState] (any): The initial state. You may optionally specify it to hydrate the state from
the server in universal apps, or to restore a previously serialized user session. If you produced
reducer with combineReducers, this must be a plain object with the same shape as the keys
passed to it. Otherwise, you are * * free to pass anything that your reducer can understand.

* [enhancer] (Function): The store enhancer. You may optionally specify it to enhance the store
with third-party capabilities such as middleware, time travel, persistence, etc. The only store
enhancer that ships with Redux is applyMiddleware().
 */
