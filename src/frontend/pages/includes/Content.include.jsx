import React, { Component } from 'react';
import { hot } from 'react-hot-loader';

class Content extends Component {
	render() {
		// props
		const { children } = this.props;

		return <main>{children}</main>;
	}
}

export default hot(module)(Content);
