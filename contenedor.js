const fs = require("fs");

class Contenedor {
    constructor(nombreArchivo) {
      this.nombreArchivo = nombreArchivo;
    }
  
    async createIfNotExists() {
      let file;
      try {
        file = await fs.promises.readFile(this.nombreArchivo, "utf-8");
        return file;
      } catch (error) {
        if (error.code == "ENOENT") {
          await fs.promises.writeFile(this.nombreArchivo, "[]");
          file = await fs.promises.readFile(this.nombreArchivo, "utf-8");
        } else {
          console.log(error);
        }
      }
      return file;
    }
  
    async save(objeto) {
      let file = await contenedor1.createIfNotExists();
      let parsedFile = JSON.parse(file);
      if (parsedFile.length > 0) {
        objeto.id = parsedFile.length + 1;
        parsedFile.push(objeto);
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(parsedFile)
        );
      } else {
        objeto.id = 1;
        parsedFile.push(objeto);
        await fs.promises.writeFile(
          this.nombreArchivo,
          JSON.stringify(parsedFile)
        );
      }
      return objeto.id;
    }
  
    async getById(number) {
      const file = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      const parsedFile = JSON.parse(file);
      const result = parsedFile.filter((obj) => obj.id == number);
      if (result) {
        return result[0];
      } else {
        return null;
      }
    }
  
    async getAll() {
      await contenedor1.createIfNotExists();
      const txt = await fs.promises.readFile(this.nombreArchivo, "utf-8");
      return JSON.parse(txt);
    }
  
    async deleteById(id) {
      let file = await contenedor1.createIfNotExists();
      let parsedFile = JSON.parse(file);
      const result = parsedFile.filter((obj) => obj.id != id);
      await fs.promises.writeFile(this.nombreArchivo, JSON.stringify(result));
      return result;
    }

  
    async deleteAll() {
      try {
        await fs.promises.writeFile("./producto.txt", "[]");
        return "[]";
      } catch (error) {
        console.log(error.mesage);
      }
    }
  }
  
  const producto = {
        
    name: "CANANA PORTA HERRAMIENTAS",
    category: "porta herramientas",
    price: 1000,
    stock: 5,
    image: "/img/oferta6.jpg",
  };
  
  const contenedor1 = new Contenedor("./producto.txt");
  //contenedor1.save(producto);
  

  module.exports = {
      contenedor1,
      Contenedor
    };