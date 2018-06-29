db = db.getSiblingDB('admin');
db.review.drop();
db.createCollection("review",{ capped : true, autoIndexId : true, size : 
  6142800, max : 10000 });
db.review.insert({ sku: 'Iphone', review: 'Excellent 5 star phone' });
db.review.insert({ sku: 'Samsung', review: 'Excellent 4 star phone' });
db.review.insert({ sku: 'Nokia', review: 'Excellent 3 star phone' });
db.review.insert({ sku: 'Alcatel', review: 'Excellent 2 star phone' });