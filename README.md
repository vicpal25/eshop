# eshop
Node/GraphQL Ecommerce Project

----
## products
```
query GetProducts {
  	products {
        name
        sku
      }     
}
```

----
## categories
```
query GetCategories {

  	categories {
      name
      categoryId
    }  
}
```

----
## Get a Category with Products
```
query GetCategoryWithProducts{
  
  availableProducts(categoryId:"1") {
    name
    sku
  }
  
}
```