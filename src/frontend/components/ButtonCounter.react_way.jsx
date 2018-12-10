import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class ButtonCounter extends Component {
	state = {
		counter: 0
	};

	componentDidMount() {
		this.setState(prevState => ({
			counter: prevState.counter
		}));
	}

	increaseCounter = () => {
		this.setState(prevState => ({
			counter: prevState.counter + 1
		}));
	};

	decreaseCounter = () => {
		const counterNotBelowZero = (state) => {
			return state.counter > 0 ? state.counter - 1 : state.counter;
		};

		this.setState(prevState => ({
			counter: counterNotBelowZero(prevState)
		}));
	};

	resetCounter = () => {
		this.setState(prevState => ({
			counter: prevState.counter * 0
		}));
	};

	render() {
		return (
			<div>
				<h2>Button Counter App: React way</h2>
				<button onClick={this.decreaseCounter}>- DECREMENT</button>
				<button onClick={this.resetCounter}>{this.state.counter}</button>
				<button onClick={this.increaseCounter}>INCREMENT +</button>
			</div>
		);
	}
}

export default hot(module)(ButtonCounter);
