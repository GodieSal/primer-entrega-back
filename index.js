const express = require("express");
const app = express();
const http = require('http').createServer(app);
const productsRouters = require('./routers/productsRouters');
const io = require('socket.io')(http);
const cartsRouters = require('./routers/cartsRouters');
const handlebars = require('express-handlebars');
const fs = require("fs");
const viewsRouter = require('./routes/viewsRouter');
const { v4: uuidv4 } = require('uuid');

app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.static("public"));

const products = [];
const todoslosProductos = JSON.parse(fs.readFileSync("./productos.json", "utf8"));
products.push(...todoslosProductos);


app.use('/api/products',productsRouters);
app.use('/api/cart',cartsRouters);
app.use('/views', viewsRouter);
app.get("/", (req, res) => {
  res.render("home", { products });
});

app.get("/ProductosTreal"), (req, res) => {
  res.render("ProductosTreal", { products })};

io.on('connection'), (socket) => {
  console.log('New user connected')};

  const PORT = 8080;
  http.listen(PORT, () => {
      console.log(`Servidor inciado en http://localhost:${PORT}`);
  });

io.on("connection"), (socket) => {
  console.log("Alguien se conecto")};

  socket.on("disconnect", () => {
      console.log("Desconectado");
  });

  socket.on("addProduct", (newProduct) => {
    newProduct.id = uuidv4();
    products.push(newProduct);
    fs.writeFileSync("./productos.json", JSON.stringify(products), (err) => {
        if (err) {
            throw new Error(err);
        }
    });
    io.emit('updateProducts', products);
});

socket.on("deleteProduct"), (productId) => {
  const index = products.findIndex(p => p.id === productId)};
  if (index !== -1) {
      products.splice(index, 1)};
      fs.writeFileSync("./productos.json", JSON.stringify(products), (err) => {
          if (err) {
              throw new Error(err);
          }
      });
      io.emit('updateProducts', products);