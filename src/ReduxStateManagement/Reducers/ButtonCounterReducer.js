import { ButtonCounterActionType } from '../ActionTypes/ButtonCounter.action.types';

const INITIAL_STATE = {
	counter: 0
};

export const ButtonCounterReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
	case ButtonCounterActionType.incrementCounter:
		return {
			counter: state.counter + 1
		};
	case ButtonCounterActionType.decrementCounter:
		return {
			counter: state.counter > 0 ? state.counter - 1 : state.counter
		};
	case ButtonCounterActionType.resetCounter:
		return {
			counter: state.counter * 0
		};
	default:
		return state;
	}
};
