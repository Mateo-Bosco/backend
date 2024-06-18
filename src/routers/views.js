import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();

router.get('/realtimeproducts', (req,res)=>{
    return res.render('realTimeProducts');
});

// router.get('/', (req,res)=>{
//     const p = new ProductManager();
//     const products = p.getProducts();
//     return res.render('home', {products, styles: 'styles.css'});
// });

export default router;