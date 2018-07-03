module.exports = {
	"pluginConfig": {
		"@axway/api-builder-plugin-fn-swagger": {
			"products-service": {
				"x-vendor-openapi-authtype": "basic",
				"x-vendor-openapi-username": process.env.PRODUCT_APIKEY,
				"x-vendor-openapi-password": process.env.PRODUCT_PASSWORD || "",
				'x-vendor-openapi-uri': {
					'host': process.env.PRODUCT_HOST,
					'port': parseInt(process.env.PRODUCT_PORT) || 8080
				}				
			}
		}
	}
};