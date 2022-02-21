const express = require("express");

const apiRoutes = require("./Routes/index");

const { contenedor1, Contenedor } = require('./contenedor');

const app = express();

const PORT = process.env.PORT || 5000;

//middlerwares
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("./Routes/public"));

app.use("/api", apiRoutes);


const conectedServer = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

conectedServer.on(`error`, (error) => {
  console.log(error.message);
});
