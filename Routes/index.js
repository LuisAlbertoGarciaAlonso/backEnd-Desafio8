const express = require("express");

const productRoutes = require("./products.routes");

const router = express.Router();


//middlewares
router.use(express.json());
router.use(express.urlencoded({extended:true}));

router.use("/products", productRoutes);




module.exports = router;//no olvidar!!!!



