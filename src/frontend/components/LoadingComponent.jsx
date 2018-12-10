import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class LoadingComponent extends Component {
	constructor(props) {
		super(props);
	}

	loading = () => {
		if (this.props.error) {
			return (
				<div>
					Error! <button onClick={this.props.retry}>Retry</button>
				</div>
			);
		} else if (this.props.pastDelay) {
			return <div>Loading...</div>;
		} else {
			return null;
		}
	};

	render() {
		return <>{this.loading()}</>;
	}
}

export default hot(module)(LoadingComponent);
