const ProductManager = require("./productManager");

const product = new ProductManager();

console.log(product.addProduct(`Laptop`, `Lenovo 29`, 5000, `https://img1.com`, `shg23a`, 20));
console.log(product.addProduct(`Laptop`, `hp 23`, 4000, `https://img1.com`, `shg31a`, 25));
console.log(product.addProduct(`Laptop`, `Latitude 293`, 2000, `https://img1.com`, `shg30a`, 12));

// console.log(product.getProducts());
// console.log(product.getProductById());

// console.log(product.deleteProduct(3));

const productUpdate = {
    "id":3,
    "title":"Laptop 3",
    "description":"Latitude 293",
    "price":2500,
    "thumbnail":"https://img10.com",
    "code":"shg30a",
    "stock":10,
}

console.log(product.updateProduct(3, productUpdate));