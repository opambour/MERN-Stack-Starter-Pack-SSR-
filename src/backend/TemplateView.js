import serialize from 'serialize-javascript';

export default options => {
	const { title, html, store, context, res } = options;

	if (context.url) {
		// when redirect happens and this allows us to send a proper redirect from the server.
		res.writeHead(context.statusCode, {
			Location: context.url
		});
		res.end();
		// res.redirect(context.statusCode, context.url); // status 301 from redirect
	} else {
		return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${title}</title>
    </head>
    <body>
        <div id="root">${html}</div>
        <script>
            window.__PRELOADED_STATE__ = ${serialize(store.getState())}
        </script>
        <script type="text/javascript" src="/client.build.js" defer></script>
    </body>
    </html>`;
	}
};
