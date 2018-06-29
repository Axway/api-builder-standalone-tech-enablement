WIP

# Product-Review Microservice Dockerisation

THIS CHAPTER IS BASED ON THE DEMO SERVICES BUT IS IN WIP:
* Update content according to the product-review service
* Add the architecture diagram with Docker involved



This service aggregates information from internal services - Product API and Review API - and publicly available API.

The following environment variables need to be configured to work with the Product and Review services.

| Name           | Description                               |
|:---------------|:------------------------------------------|
| PRODUCT_API_HOST      | The host running the product-service.        |
| PRODUCT_API_PORT      | The port the product app is listening on.    |
| PRODUCT_API_APIKEY    | The product-service apikey.                  |
| REVIEW_API_HOST   | The host running the review-service.     |
| REVIEW_API_PORT   | The port the review app is listening on. |
| REVIEW_API_APIKEY | The review-service apikey.               |

## Docker Build
```
docker build -t api-builder-demo-user-news-and-weather-service  ./
```

## API Builder Environment Variables
The docker image can be configured at runtime via environment variables. This is a list of the common variables that you will need to set to use this image.

| Name           | Description                                       | Default                          | Options                   |
|:---------------|:--------------------------------------------------|:---------------------------------|:--------------------------|
| APIKEY   | The API key for incoming requests to the service. | Ejj2qUWgcyNNzCtWP3cuubqeCgHm90Y3 | |
| PORT           | The port the service will be listening on.        | 8080                             | |
| NEWS_HOST      | The host running the news-service.                | localhost                        | |
| NEWS_PORT      | The port the news app is listening on.            | 8080                             | |
| NEWS_APIKEY    | The news-services apikey.                         | Ejj2qUWgcyNNzCtWP3cuubqeCgHm90Y3 | |
| WEATHER_HOST   | The host running the weather-service.             | localhost                        | |
| WEATHER_PORT   | The port the weather app is listening on.         | 8080                             | |
| WEATHER_APIKEY | The weather-service apikey.                       | Ejj2qUWgcyNNzCtWP3cuubqeCgHm90Y3 | |
| LOGLEVEL | Logging level to use                              | debug                            | debug, trace, info, error |



### Running the image

Standard run

```
docker run -e NEWS_HOST=<newshost> -e WEATHER_HOST=<weatherhost> -p 8080:8080 api-builder-demo-user-news-and-weather-service
```

Or with additional environment overrides. 

```
docker run -e APIKEY=<apikey> -e PORT=<port> -e NEWS_HOST=<news host> -e NEWS_PORT=<news port> -e NEWS_APIKEY=<news apikey> -e WEATHER_HOST=<weather host> -e WEATHER_PORT=<weather port> -e WEATHER_APIKEY=<weather apikey> -p 8080:8080 api-builder-demo-user-news-and-weather-service
```

### Testing the service

The service has two endpoints, one for registering users and one for retrieving the information. The registration endpoint is a POST ```/api/register``:

```
curl -X POST -u Ejj2qUWgcyNNzCtWP3cuubqeCgHm90Y3: -H "Content-Type: application/json" -d '{"uid": "spiderman", "city": "New York", "country": "US", "interest": "sports" }' http://localhost:8080/api/register
```

And then the endpoint to retrieve the information for that user ```/api/:uid/info```:

```
curl -X GET -u Ejj2qUWgcyNNzCtWP3cuubqeCgHm90Y3: "http://localhost:8080/api/spiderman/info"
```