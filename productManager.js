const fs = require(`fs`);

class ProductManager{
    #products;
    #path;
    static idProduct = 0;

    constructor(){
        this.#path = `./data/products.json`;
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

    addProduct(title, description, price, thumbnail, code, stock){

        if(!title || !description || !price || !thumbnail || !code || !stock)
            return `Todos los parametros son requeridos[title, description, price, thumbnail, code, stock]`

        const codeRepeat = this.#products.some(p=> p.code == code);
        if(codeRepeat)
            return `El código ${code} ya se encuentra registrado en otro producto`;

        ProductManager.idProduct = ProductManager.idProduct + 1;
        const id = this.#assignIdProduct();

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        };
        this.#products.push(newProduct);
        this.#saveFile();

        return `Producto agregado exitosamente`;
    }

    getProducts(){
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
        let msg = `El producto con id ${id} no existe`;

        const index = this.#products.findIndex(p=> p.id === id);

        if (index !== -1){
            const {id, ...rest} = objectUpdate;
            this.#products[index] = {...this.#products[index], ...rest};
            this.#saveFile();
            msg = `¡Producto actualizado!`;
        }

        return msg;
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
    }
}



module.exports = ProductManager