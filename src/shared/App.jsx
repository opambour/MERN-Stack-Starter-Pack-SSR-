import '@babel/polyfill';
import React, { Component } from 'react';
import Loadable from 'react-loadable';
import { hot } from 'react-hot-loader';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoadingComponent from '../frontend/components/LoadingComponent';

// import scss or css
import('../frontend/public/scss/Grid.scss');
import('../frontend/public/scss/App.scss');
import('../frontend/public/scss/Forms.scss');

// code splitting with react-loadable
const Header = Loadable({
	loader: () => import('../frontend/pages/includes/Header.include'),
	loading: LoadingComponent
});

const Footer = Loadable({
	loader: () => import('../frontend/pages/includes/Footer.include'),
	loading: LoadingComponent
});

const Content = Loadable({
	loader: () => import('../frontend/pages/includes/Content.include'),
	loading: LoadingComponent
});

const HomePage = Loadable({
	loader: () => import('../frontend/pages/Home.page'),
	loading: LoadingComponent
});

const AboutPage = Loadable({
	loader: () => import('../frontend/pages/About.page'),
	loading: LoadingComponent
});

const ContactPage = Loadable({
	loader: () => import('../frontend/pages/Contact.page'),
	loading: LoadingComponent
});

const SignupPage = Loadable({
	loader: () => import('../frontend/pages/Signup.page'),
	loading: LoadingComponent
});

const LoginPage = Loadable({
	loader: () => import('../frontend/pages/Login.page'),
	loading: LoadingComponent
});

const Routes = [
	{
		path: '/',
		component: HomePage,
		exact: true
	},
	{
		path: '/about',
		component: AboutPage,
		exact: true
	},
	{
		path: '/contact',
		component: ContactPage,
		exact: true
	},
	{
		path: '/signup',
		component: SignupPage,
		exact: true
	},
	{
		path: '/login',
		component: LoginPage,
		exact: true
	}
];

// only for redirect
const RedirectWithStatus = ({ from, to, statusCode }) => (
	<Route
		render={({ context }) => {
			if (context) {
				context.statusCode = statusCode;
			} else {
				return <Redirect from={from} to={to} />;
			}
		}}
	/>
);

/**
 * @desc  Status can be added anywhere in the app that you want to add the code to staticContext. best used in server-side rendering
 * @param {*} param0
 */
const Status = ({ statusCode, children }) => (
	<Route
		render={({ context }) => {
			if (context) {
				context.statusCode = statusCode;
			}

			return children;
		}}
	/>
);

const NotFound = props => {
	setTimeout(() => {
		props.history.push('/');
	}, 5000);

	return (
		<div style={{ width: '100%', textAlign: 'center' }}>
			<h2>
				404: The requested page or path{' '}
				<small>
					<code>{props.location.pathname}</code>
				</small>{' '}
				could NOT be found!
				<br />
			</h2>
			Redirecting in 5 seconds...!
		</div>
	);
};

//
const NotFoundWithStatus = props => {
	// redirect to home page in 5 seco
	setTimeout(() => {
		props.history.push('/');
	}, 5000);

	return (
		<Status statusCode={404}>
			<div style={{ width: '100%', textAlign: 'center' }}>
				<h2>
					404: The requested page or path{' '}
					<small>
						<code>{props.location.pathname}</code>
					</small>{' '}
					could NOT be found!
					<br />
				</h2>
				Redirecting in 5 seconds...!
			</div>
		</Status>
	);
};

class App extends Component {
	render() {
		return (
			<>
				<Header />

				<Content>
					<Switch>
						{Routes.map((route, index) => (
							<Route {...route} key={index} />
						))}

						{/* <Redirect from={'/home'} to={'/'} /> */}
						<RedirectWithStatus from={'/home'} to={'/'} statusCode={301} />
						{/* <Route component={NotFound} /> */}
						<Route component={NotFoundWithStatus} />
					</Switch>
				</Content>

				<Footer />
			</>
		);
	}
}

export default hot(module)(App);
