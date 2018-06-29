module.exports = {
	"pluginConfig": {
		"@axway/api-builder-plugin-fn-swagger": {
			"paralleldots": {
				"x-vendor-openapi-authtype": "apiKey",
				"x-vendor-openapi-key": process.env.PD_APIKEY
			}
		}
	}
};
