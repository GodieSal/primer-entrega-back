const express = require("express");
const app = express();
const productsRouters = require('./routers/productsRouters');
const cartsRouters = require('./routers/cartsRouters');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products',productsRouters);
app.use('/api/cart',cartsRouters);

const PORT = 4000;
app.listen(PORT, () => {
  console.log("servidor fuinciona");
});
