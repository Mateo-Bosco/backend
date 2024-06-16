// const fs = require(`fs`);
import fs from "fs";

class ProductManager{
    #products;
    #path;
    static idProduct = 0;

    constructor(){
        this.#path = `./src/data/products.json`;
        this.#products = this.#readProductsInFile();
    }

    #assignIdProduct(){
        let id = 1;
        if (this.#products.length != 0)
            id = this.#products[this.#products.length - 1].id + 1;
        return id;
    }

    #readProductsInFile(){
        try{
            if (fs.existsSync(this.#path))
                return JSON.parse(fs.readFileSync(this.#path, `utf-8`));

            return [];
        } catch (error) {
            console.log(`Ocurrio un error al momento de leer el archivo de productos, ${error}`);
        }
    }

    #saveFile(){
        try{
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        } catch (error) {
            console.log(`Ocurrio un error al momento de guardar el archivo de productos, ${error}`);
        }
    }

    addProduct(title, description, price, thumbnails=[], code, stock, category, status = true){

        let result = `Ocurrio un error`;

        if(!title || !description || !price || !code || !stock || !category)
            result = `Todos los parametros son requeridos[title, description, price, code, stock, category]`;
        else{
            const codeRepeat = this.#products.some(p=> p.code == code);
            if(codeRepeat)
                result = `El código ${code} ya se encuentra registrado en otro producto`;
            else{
                ProductManager.idProduct = ProductManager.idProduct + 1;
                const id = this.#assignIdProduct();
        
                const newProduct = {
                    id,
                    title,
                    description,
                    price,
                    thumbnails,
                    code,
                    stock,
                    category,
                    status,
                };
                this.#products.push(newProduct);
                this.#saveFile();
                msg = {
                    msg:`Producto agregado exitosamente`,
                    producto: newProduct
                }
            }
        }
        return result;
    }

    getProducts(limit = 0){
        limit = Number(limit);
        if(limit > 0)
            return this.#products.slice(0,limit);
        return this.#products;
    }

    getProductById(id){
        const product = this.#products.find(p => p.id == id);
        if(product)
            return product;
        else
            return `Not Found del producto con id ${id}`;
    }

    updateProduct(id, objectUpdate){
        let result = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p=> p.id === id);

        if (index !== -1){
            const {id, ...rest} = objectUpdate;
            const allowedProperties = [`title`, `description`, `price`, `thumbnails`, `code`, `stock`, `category`, `status`];
            const updateProperties = Object.keys(rest)
            .filter(propiedad => allowedProperties.includes(propiedad))
            .reduce((obj,key)=>{
                obj[key]= rest[key];
                return obj;
            }, {});
            this.#products[index] = {...this.#products[index], ...rest};
            this.#saveFile();
            result = {
                msg:`¡Producto actualizado!`,
                producto:this.#products[index]
            };
        }

        return result;
    }

    deleteProduct(id){
        let msg = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p => p.id === id);
        if(index !== -1){
            this.#products = this.#products.filter(p=> p.id !== id);
            this.#saveFile();
            msg = `¡Producto eliminado!`;
        }

        return msg;
    }};


// module.exports = ProductManager
export default ProductManager;