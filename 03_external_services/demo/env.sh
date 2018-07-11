export PRODUCT_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' demo_product_1)
export PRODUCT_PORT=8080
export PRODUCT_APIKEY=jEeLFb2xjLQNxKBJBf89tEl+aL8+nj1X
export REVIEW_HOST=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' demo_review_1)
export REVIEW_PORT=8080
export REVIEW_APIKEY=CI5Uaei7o3AqI/J85trGCkYEjY/R7Q0v
export PD_APIKEY=oSIpJX3A4Mta3fC1kB2us6uyERXmFdgy06q3SzZLA58
