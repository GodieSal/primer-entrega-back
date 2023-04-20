const express = require("express");
const routerProducts = express.Router();
const fs = require("fs");
const { v4: uuidv4} = require('uuid');


const products = [];
const todoslosProductos = JSON.parse(fs.readFileSync("./productos.json" , "utf8", (error)=>{
    throw Error(error)
}));




products.push(...todoslosProductos);


routerProducts.get('/',(req,res) =>{
    res.send(products)
});
routerProducts.get('/:pid',(req,res) =>{

    let {pid} = req.params;
    const product = products.find(p => p.id === pid);
    res.send(product)
});

routerProducts.post('/' , (req,res) =>{

const nuevoProducto = {...req.body, id:uuidv4()};
products.push(nuevoProducto);
fs.writeFileSync("./productos.json" , JSON.stringify(products),(err)=>{

    

   
    throw new Error(err)
    
})
res.send('producto añadido')

});

routerProducts.put('/:pid' , (req,res) =>{
    const {pid} = req.params;
    const product = req.body;
    const index = products.findIndex(p=> p.id ===pid);
    if(!!!index){
products[index] = {
    ...product,
    id : pid
}
res.send('el producto ha sido modificado')
    }else{
        res.status(400).send('no existe un producto con ese id');    }
    
    })



    routerProducts.delete('/:pid' , (req,res) =>{
     
        let arrayVacio =[ ];
        const id = req.params.pid;
        todoslosProductos.map((product) =>{
            if(product.id !== id) arrayVacio.push(product)
            console.log('arrayvacio' , arrayVacio)
           
        })
        fs.writeFileSync('\productos.json', JSON.stringify(arrayVacio),);
        res.send('producto borrado');
        })
    





module.exports =
    routerProducts,
   {products};
  