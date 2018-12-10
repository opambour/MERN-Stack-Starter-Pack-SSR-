import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class About extends Component {
	render() {
		return (
			<div style={{ width: '100%', textAlign: 'center' }}>
				<h1>About Page</h1>
			</div>
		);
	}
}

export default hot(module)(About);
