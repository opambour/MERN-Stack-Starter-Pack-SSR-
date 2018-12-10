import React from 'react';
import Loadable from 'react-loadable';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

import { BrowserRouter } from 'react-router-dom';

import store from '../ReduxStateManagement/Store';
import App from '../shared/App';

Loadable.preloadReady().then(() => {
	hydrate(
		<Provider store={store()}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</Provider>,
		document.querySelector('#root')
	);
});

// Hot Module Replacement
if (module.hot) {
	module.hot.accept();
}

/**
 * hydrate is going to tell React that you’ve already created the markup on the
 * server and instead of recreating * it on the client, it should preserve
 * it and just attach any
 * needed event handlers to the existing server *rendered markup.
 */
