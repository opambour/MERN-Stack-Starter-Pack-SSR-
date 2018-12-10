import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import TextField from '../components/forms/TextField';

class Signup extends Component {
	render() {
		return (
			<>
				<div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
					<div style={{ width: '30%' }}>
						<div style={{ textAlign: 'center' }}>
							<h1>Signup Page</h1>
						</div>

						<form action="">
							<TextField type={ 'text' } name={ 'First name' } labelColor={ '#314ffa' } />
							<TextField type={ 'text' } name={ 'Last name' } labelColor={ '#314ffa' } />
							<TextField type={ 'text' } name={ 'Username' } labelColor={ '#314ffa' } />
							<TextField type={ 'text' } name={ 'Email' } labelColor={ '#314ffa' } />
							<TextField type={'password'} name={'Password'} />
							<TextField type={ 'password' } name={ 'Password repeat' } />
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<button type={'submit'}>REGISTER</button>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default hot(module)(Signup);
