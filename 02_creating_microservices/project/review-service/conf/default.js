/**
 * These are your configuration file defaults.
 *
 * You can create additional configuration files ending in *.default.js or *.local.js that the server will load.
 * The *.local.js files are ignored by git/npm due to the .gitignore file in the conf directory. Docker will also ignore these files
 * using the .dockerignore file in the project root. This is so you can develop your service locally using *.local.js files
 * and keep your production configs in the *.default.js files.
 *
 * For example, you may want to develop your service using a test API key. You would place that API key in a *.local.js
 * file and it would get merged over the API key that is already present in default.js
 *
 * This is a JavaScript file (instead of JSON) so you can also use environment variables or perform logic in this file if needed.
 */
module.exports = {
	// This is your generated API key.  It was generated uniquely when you created this project.
	// DO NOT SHARE this key with other services and be careful with this key since it controls
	// access to your API using the default configuration.

	// API key
	apikey: 'CI5Uaei7o3AqI/J85trGCkYEjY/R7Q0v',

	// By default the authentication strategy is 'basic' which will use HTTP Basic Authorization where the
	// usename is the key and the password is blank.  the other option is 'apikey' where the value of the
	// APIKey header is the value of the key.  you can also set this to 'plugin' and define the key 'APIKeyAuthPlugin'
	// which points to a file or a module that implements the authentication strategy.
	// If you want to remove authentication then set this to 'none'.
	APIKeyAuthType: 'basic',

	// This is the base url the service will be reachable at not including the port
	baseurl: 'http://localhost',

	// This is the port the service will be bound to
	port: 8080,

	// Enabling this property will print out the process.env at startup time
	printEnvVars: false,

	// Your ssl configuration goes here. The options are the same has what is used by
	// Node.js https.createServer() method
	// https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener

	// ssl: {
	// 	port: 8443
	// },

	// The number of milliseconds before timing out a request to the server.
	timeout: 120000,

	// Log level of the main logger. Can be set to 'debug', 'error', 'fatal', 'info', 'trace', or 'warn'.
	logLevel: 'debug',

	// Prefix to use for apis
	apiPrefix: '/api',

	// Control the settings for the api-builder-admin console
	admin: {
		// Control whether the admin website is available
		enabled: true,
		// The prefix for the API documentation
		apiDocPrefix: '/apidoc',
		// If you set disableAPIDoc, in production your swagger API docs will not show up
		disableAPIDoc: false,
		// The hostnames or IPs from which connections to admin are allowed. Hostnames must be resolvable on the
		// server. IP ranges can also be specified. e.g. [ 'localhost', '192.168.1.0/24', '10.1.1.1' ]
		// An empty list [] will allow unrestricted access, though this is not recommended due to security concerns.
		allowedHosts: [
		]
	},

	// You can generally leave this as-is since it is generated for each new service you created.
	session: {
		encryptionAlgorithm: 'aes256',
		encryptionKey: '/ABHmzB71WbzwciTm7g4I0xIhxyqg3kVw0RBdtWWgnc=',
		signatureAlgorithm: 'sha512-drop256',
		signatureKey: 'J+Em3TRBPvTeUeaFQtlGXgGHq3LQB2mWkSCu0zpSbV3FLk2BwQ3xxvl+Wufc6+wvUP2L88XYP/DG0uTuc2FUDA==',
		secret: 'xYLstzSs3XkPHv4sgyOkqmXs2RbKUZpG', // should be a large unguessable string
		duration: 86400000, // how long the session will stay valid in ms
		activeDuration: 300000 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
	},

	// If you want signed cookies, you can set this value. if you don't want signed cookies, remove or make null
	cookieSecret: 'Cth8tZ7sG5Uf3UvE0HaaqfPiRgChN7hg',

	// your connector configuration goes here
	connectors: {
	},

	// Cross-Origin Resource Sharing settings
	cors: {
		// List of allowed origins (format: any, space separated string, array or regex)
		// 'Access-Control-Allow-Origin': '*' or 'http://foo.com http://bar.com' or ['http://foo.com', 'http://bar.com'] or /foo\.com$/,

		// Sets the Access-Control-Allow-Credentials header on API responses. Can be true or false
		// 'Access-Control-Allow-Credentials': false,

		// Only these methods will be allowed out of all available methods for an endpoint. All available methods are allowed by default
		// (format: comma separated string or, an array: e.g. 'GET' or 'GET, PUT' or ['GET', 'PUT'])
		// 'Access-Control-Allow-Methods': ['GET', 'PUT', 'POST', 'PATCH', 'DELETE'],

		// Allowed request headers (format: comma separated string or, an array: e.g. 'content-type, authorization' or ['content-type', 'authorization'])
		// 'Access-Control-Allow-Headers': ['content-type', 'authorization'],

		// List of response headers exposed to the user. Always exposed headers: request-id, response-time and any headers defined in the endpoint
		// (format: comma separated string or, an array: e.g. 'content-type, response-time' or ['content-type', 'response-time'])
		// 'Access-Control-Expose-Headers': ['content-type', 'response-time']
	}
};
