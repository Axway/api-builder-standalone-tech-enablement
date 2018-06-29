db = db.getSiblingDB('admin');
db.review.drop();
db.createCollection('review',{ capped : true, autoIndexId : true, size : 
  6142800, max : 10000 });
db.review.insert({ sku: 'SKU1', reviews: [ { review: 'Best taste ever!!!', user: 'John'},{ review: 'Had better meals!!!', user: 'Jack'},{ review: 'Too spicy!!!', user: 'Jane'} ] });
db.review.insert({ sku: 'SKU2', reviews: [ { review: 'Most popular in GB!!!', user: 'William'},{ review: 'I prefer black tea!!!', user: 'Margaret'},{ review: 'Better then coffee!!!', user: 'Ramsey'} ] });
db.review.insert({ sku: 'SKU3', reviews: [ { review: 'Not my kinda food!!!', user: 'Elizabeth'},{ review: 'Its nice but not best!!!', user: 'Collin'},{ review: 'Too spicy!!!', user: 'Jimmy'} ] });
