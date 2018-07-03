module.exports = {
	"pluginConfig": {
		"@axway/api-builder-plugin-fn-swagger": {
			"review-service": {
				"x-vendor-openapi-authtype": "basic",
				"x-vendor-openapi-username": process.env.REVIEW_APIKEY,
				"x-vendor-openapi-password": process.env.REVIEW_PASSWORD || "",
				'x-vendor-openapi-uri': {
					'host': process.env.REVIEW_HOST,
					'port': parseInt(process.env.REVIEW_PORT)
				}				
			}
		}
	}
};