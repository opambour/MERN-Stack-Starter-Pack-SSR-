import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { NavLink } from 'react-router-dom';
// helps to get browserRouter objects like match, location, history, etc
import { withRouter } from 'react-router';

class Header extends Component {
	render() {
		const { location } = this.props;

		const active = path => {
			if (location.pathname === path) {
				return 'Active';
			}

			return '';
		};

		return (
			<>
				<header>
					<div id="brand_name">
						<NavLink to={'/'}>Brand Name</NavLink>
					</div>

					<div id="master_nav">
						<ul className="Nav-ul">
							<li>
								<NavLink to={'/'} className={active('/')}>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink to={'/about'} className={active('/about')}>
									About
								</NavLink>
							</li>
							<li>
								<NavLink to={'/contact'} className={active('/contact')}>
									Contact
								</NavLink>
							</li>
						</ul>

						<ul className="Nav-ul">
							<li>
								<NavLink to={'/signup'} className={active('/signup')}>
									Signup
								</NavLink>
							</li>
							<li>
								<NavLink to={'/login'} className={active('/login')}>
									Login
								</NavLink>
							</li>
						</ul>
					</div>
				</header>
			</>
		);
	}
}

export default hot(module)(withRouter(Header));
