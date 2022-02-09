const express = require("express");
const { contenedor1, Contenedor } = require('./contenedor');
const app = express();
const PORT = process.env.PORT || 8080;
//middlerwares
app.use(express.json()); //agrgar esto para que lea del body parsea a json
app.use(express.urlencoded({ extended: true }));

app.get("/products", (req, res) => {
  contenedor1.getAll().then((txt) => {
    res.send(txt);
  });
});

app.get("/productsRandom", (req, res) => {
  contenedor1.getAll().then((txt) => {
    let random = Math.floor(Math.random() * (1,6)+1);
    contenedor1.getById(random).then((resultado) => {
      res.send(resultado);
      console.log(random)
    });
  });
});

const conectedServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

conectedServer.on(`error`, (error) => {
  console.log(error.message);
});
