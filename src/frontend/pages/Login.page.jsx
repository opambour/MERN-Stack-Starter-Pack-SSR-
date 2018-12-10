import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import TextField from '../components/forms/TextField';

class Login extends Component {
	render() {
		return (
			<>
				<div style={ { display: 'flex', justifyContent: 'center', width: '100%' }}>
					<div style={{width: '30%'}}>
						<div style={{textAlign: 'center'}}>
							<h1>Login Page</h1>
						</div>

						<form action="">
							<TextField type={'text'} name={'Email || Username'} labelColor={'#314ffa'} />
							<TextField type={'password'} name={'Password'} />
							<div style={{ display: 'flex', justifyContent: 'center' }}>
								<button type={'submit'}>LOGIN</button>
							</div>
						</form>
					</div>
				</div>
			</>
		);
	}
}

export default hot(module)(Login);

/**
 * <div style={ { width: '100%', display: 'flex', justifyContent: 'center' } }>
				<div style={{diplay: 'flex', flex: 12}}>
					<h1>Login Page</h1>
				</div>

				<form action="">
					<div style={{ width: 300 }}>
						<TextField type={'text'} name={'Email || Username'} />
						<TextField type={ 'password' } name={ 'Password' } />
						<div style={{display: 'flex', justifyContent: 'center'}}>
							<button type={ 'submit' }>
								LOGIN
							</button>
						</div>
					</div>
				</form>
			</div>
 */
