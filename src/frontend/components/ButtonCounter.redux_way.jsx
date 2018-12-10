import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { IncrementCounter, DecrementCounter, ResetCounter } from '../../ReduxStateManagement/ActionCreators/ButtonAction.creators';

class ButtonCounter extends Component {
	render() {
		// props
		const { counter, incrementCounterHandler, decrementCounterHandler, resetCounterHandler } = this.props;

		return (
			<div>
				<h2>Button Counter App: Redux way</h2>
				<button onClick={ decrementCounterHandler }>- DECREMENT</button>
				<button onClick={ resetCounterHandler }>{counter}</button>
				<button onClick={ incrementCounterHandler }>INCREMENT +</button>
			</div>
		);
	}
}

// mapStateToProps
const mapStateToProps = (state, ownProps) => {
	return {
		counter: state.buttonCounter.counter
	};
};

// mapDispatchToProps: dispatch Action Creators to props
const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		incrementCounterHandler: () => dispatch(IncrementCounter()),
		decrementCounterHandler: () => dispatch(DecrementCounter()),
		resetCounterHandler: () => dispatch(ResetCounter())
	};
};

export default hot(module)(
	connect(mapStateToProps, mapDispatchToProps)(ButtonCounter)
);
