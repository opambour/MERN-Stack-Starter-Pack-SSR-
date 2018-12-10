import React, { Component, createRef } from 'react';
import { hot } from 'react-hot-loader';

class TextField extends Component {
	state = {
		showHideLabel: false
	};

	showLabelHandler = () => {
		this.setState({
			showHideLabel: true
		});
	};

	hideLabelHandler = () => {
		this.setState({
			showHideLabel: false
		});
	};

	render() {
		const { type, attr, name, labelColor } = this.props;

		// join name if there's space
		const joinName = (nameParam) => {
			return nameParam.split(' ').join('_');
		};

		return (
			<div>
				{this.state.showHideLabel ? <label htmlFor={joinName(name)} style={{color: labelColor}}>{name}</label> : ''}
				<input
					type={type}
					name={joinName(name)}
					id={joinName(name)}
					placeholder={this.state.showHideLabel ? '' : name}
					{...attr}
					onFocus={this.showLabelHandler}
					onBlur={this.hideLabelHandler}
				/>
			</div>
		);
	}
}

export default hot(module)(TextField);
