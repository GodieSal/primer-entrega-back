const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");
const { v4: uuidv4} = require('uuid');



//Array  Carritos
const carritos = [];
const todosloscarts = JSON.parse(fs.readFileSync("./carrito.json" , "utf8", (error)=>{ throw Error(error) }));
carritos.push(...todosloscarts);


//carrito
routerCarts.get('/',(req,res) =>{ res.send(carritos) });

//Array productos
const todoslosProductos = [];
let products = JSON.parse(fs.readFileSync("./productos.json" , 'utf-8'));
todoslosProductos.push(...products);

//Crear carrito
routerCarts.post('/' , (req,res) =>{
    
    carritos.push({ productosCarrito: [], id: uuidv4()})
    fs.writeFileSync("./carrito.json" , JSON.stringify(carritos),(err)=>{ throw new Error(err) })
    res.send('carrito creado')
    
});
   

//Obtener carrito
routerCarts.get('/:cid' ,(req,res)=>{

    let {cid} = req.params;
    const carrito = carritos.find(c => c.id = cid);
    res.send(carrito) 

})


//Insertar productos carrito
routerCarts.post('/:cid/products/:pid' , (req,res) => {

    //carrito con params
        const {cid} = req.params;
        const carritoAsignado = carritos.find((c => c.id = cid ));

    //insertar producto desde params
        const {pid} = req.params;
        const indexp  = todoslosProductos.find((p => p.id = pid ));

        const productoRepetido = carritoAsignado.productosCarrito.find( e => e.id === pid ) //cambiar = por ===

        if(productoRepetido){
        
            carritoAsignado.productosCarrito.map( ( element )=>{ if( element.id === pid ){ element.quantity++ } }) //cambiar = por ===

        }
        else
        {
            carritoAsignado.productosCarrito.push({

                id : indexp.id, //cambiar id producto
                quantity : 1
                
                })
        }

        //cambios del json 
        fs.writeFileSync("./carrito.json" , JSON.stringify(carritos),(err)=>{ throw new Error(err) })

        //respuesta
        res.send(carritoAsignado);
 
})
    
module.exports = routerCarts;