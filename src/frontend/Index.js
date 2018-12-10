import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import store from '../ReduxStateManagement/Store';

import { BrowserRouter } from 'react-router-dom';

// code splitting without react-loadable: using babel dynamic import
import(/*  webpackChunkName: "App" */ '../shared/App').then(({ default: App }) =>
	render(
		<Provider store={store()}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
		document.querySelector('#root')
	)
);

// hot module
if (module.hot) {
	module.hot.accept();
}
