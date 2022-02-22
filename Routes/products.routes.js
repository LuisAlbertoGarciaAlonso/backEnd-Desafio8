const express = require("express");

const { contenedor1 } = require('../contenedor');

const router = express.Router();


// router.get("/", (req, res) => {
//     res.send('<h1 style= "color : blue; text-align: center; margin-top:150px;"> Hola Mundo!!! </h1>')
// });

router.get("/", (req, res) => {
    contenedor1.getAll().then((txt) => {
        res.send(txt);
    });
});

router.get("/:id", (req, res) => {
    const idParams = req.params;
    const { id } = idParams
    contenedor1.getAll().then((txt) => {
        contenedor1.getById(id).then((producto) => {
            if (!producto) {
                return res.status(404).json({ success: false, error: `Product with id: ${typeof (id)} ${id} does not exist!` });
            }
            return res.json({ success: true, result: producto });
        });
    });
});

router.post('/', async (req, res) => {
    const { name, category, price, image } = req.body;
    if (!name || !category || !price || !image) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
    }
    const newProduct = {
        name,
        category,
        price,
        image
    };
    const id= await contenedor1.save(newProduct);
    newProduct.id=id;
    return res.json({ success: true, result: newProduct });
});

router.put('/:id', (req, res) => {
    console.log("hola entre en put")

    const { params: { id }, body: { name, category, price, image } } = req;
    console.log(id, name, category, price, image, "somos los parametros");

    if (!name || !category || !price || !image) {
        return res.status(400).json({ success: false, error: 'Wrong body format' });
    };

    let productIndex = id;
    console.log(productIndex, "me da el index del producto?")
    console.log(contenedor1, "contenedor 1")

    if (productIndex <= 0) return res.status(404).json({ success: false, error: `Product with id: ${id} does not exist!` });

    const newProduct = {
        name,
        category,
        price,
        image
    };

    console.log("hola sali en put")
    return res.json({ success: true, result: newProduct });
});
//recibe y actualiza un producto según su id. No me salio como modificar el txt con put.

router.delete("/:id", (req, res) => {
    const idParams = req.params;
    const { id } = idParams
    contenedor1.getAll().then((txt) => {
        contenedor1.deleteById(id).then((producto) => {
            if (!producto) {
                return res.status(404).json({ success: false, error: `Product with id: ${typeof (id)} ${id} does not exist!` });
            }
            return res.json({ success: true, result: producto });
        });
    });
});


module.exports = router;