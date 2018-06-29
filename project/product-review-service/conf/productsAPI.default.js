module.exports = {
	"pluginConfig": {
		"@axway/api-builder-plugin-fn-swagger": {
			"productsAPI": {
				// A. Authentication Related Options
				// Optional. This must be explicitly stated if you have several securityDefinitions in the corresponding swagger.
				// Possible values are - "basic", "apiKey" "oauth2"
				// "x-vendor-openapi-authtype": "basic"

				// The plugin can automatically switch between auth types.
				// Make sure you set only one of the following
				// 1. For "basic" authentication uncomment and provide values for:
				// "x-vendor-openapi-username": "USERNAME"
				// "x-vendor-openapi-password": "PASSWORD"
				
				// 2. For "apiKey" authentication uncomment and provide values for:
				// "x-vendor-openapi-key": "API KEY"

				// 3. For "oauth2" authentication uncomment and provide values for:
				// "x-vendor-openapi-token": "OAUTH TOKEN"

				// B. URI Related Options
				// 'x-vendor-openapi-uri': {
				// 		protocol: <application protocol to use, e.g. either http, or https>
				// 		host: <server name>
				// 		port: <specifies the port on which the host system listens for requests. This parameter is optional. The default one will be set, depends on the protocol>
				// 		basePath: <basePath is the path to the API>
				// }
			}
		}
	}
};