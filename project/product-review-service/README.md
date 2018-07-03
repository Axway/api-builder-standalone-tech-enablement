# Product Review Service

This is service for searching a product by SKU and aggregate information about product details, reviews, and the most relevant categories it fits in according to its description.

## Dependencies

The service collects the data with the help of 3 underlying services.

### Internal 
* **[Product Service](../product-service)** - used to collect the Product Details
* **[Review Service](../review-service)** - used to collect the Reviews for Product

### External
* **[Parallel Dots API](http://paralleldots.com)** - used to collect Taxonomy data based on Product description.

## Service Configuration
The following environment variables need to be configured to weave services successfully.

| Name                                | Description                               |   Relates to Service    |
|:------------------------------------|:------------------------------------------|:------------------------|
| PORT (OPTIONAL)		                  | The port on which this service is running | Prodcut Review Service	| 	
| APIKEY (OPTIONAL)                   | The apikey to access the service          | Prodcut Review Service	|
| PRODUCT_HOST (default to localhost) | The host running the product-service.   	| Product Service         |
| PRODUCT_PORT (default to 8080)      | The port the product-service is accessed  | Product Service		      |
| PRODUCT_APIKEY (REQUIRED)           | The product-service apikey.               | Product Service		      |
| PRODUCT_PASSWORD (REQUIRED)         | The product-service password.     				| Product Service		      | 
| REVIEW_HOST (default to localhost)  | The host running the review-service.   	  | Review Service   	      |
| REVIEW_PORT (default to 8080)       | The port the review-service is accessed   | Review Service		      |
| REVIEW_APIKEY (REQUIRED)            | The review-service apikey.                | Review Service		      |
| REVIEW_PASSWORD (REQUIRED)          | The review-service password.     			  	| Review Service		      |
| PD_APIKEY (REQUIRED)          			| The API Key to access the Third Party API | Parallel Dots API       |

## Run the containerized service
This requires Docker on your machine. Once have it:

### Create Docker Image
```
docker build -t product-review-service-img  ./
```

### Running the Image

```
docker run --name product-review-service-ct -p 8080:8080 -e PRODUCT_PORT=<product-service port> -e PRODUCT_HOST=<product-service host> -e PRODUCT_APIKEY=<product-service apikey> -e PRODUCT_PASSWORD=<product-service password> -e REVIEW_PORT=<review-service port> -e REVIEW_HOST=<review-service host> -e REVIEW_APIKEY=<review-service apikey> -e REVIEW_PASSWORD=<review-service password> -e PD_APIKEY=<third-party apikey>  product-review-service-img
```


### Testing the service

The service has one endpoint for getting the product details:

```
curl -X GET -u <APIKEY>: -H "Content-Type: application/json" http://localhost:8080/api/v1/productinfo/<PRODUCT_SKU>
```