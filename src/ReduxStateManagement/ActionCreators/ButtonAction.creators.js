import { ButtonCounterActionType } from '../ActionTypes/ButtonCounter.action.types';

const IncrementCounter = () => {
	return {
		type: ButtonCounterActionType.incrementCounter
	};
};

const DecrementCounter = () => {
	return {
		type: ButtonCounterActionType.decrementCounter
	};
};

const ResetCounter = () => {
	return {
		type: ButtonCounterActionType.resetCounter
	};
};

export { IncrementCounter, DecrementCounter, ResetCounter };
