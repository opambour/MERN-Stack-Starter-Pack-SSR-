import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import ButtonCounterReactWay from '../components/ButtonCounter.react_way';
import ButtonCounterReduxWay from '../components/ButtonCounter.redux_way';

class HomePage extends Component {
	render() {
		return (
			<div style={{ width: '100%', textAlign: 'center' }}>
				<h1>Home Page</h1>
				<div>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit, delectus sequi exercitationem dolore reprehenderit provident, ratione nihil harum quis velit
					commodi repellat atque. Iure cupiditate odit id voluptatem incidunt. Quos.
				</div>
				<p>
					<strong>
						Edit it and make it your <em>own</em>!
					</strong>
				</p>
				<div id={'button_counter_app'}>
					<div>
						<ButtonCounterReactWay />
					</div>
					<div>
						<ButtonCounterReduxWay />
					</div>
				</div>
			</div>
		);
	}
}

export default hot(module)(HomePage);
