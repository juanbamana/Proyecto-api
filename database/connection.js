const mongoose = require("mongoose");

const connection = async () => {

    try {

       await mongoose.connect("mongodb://localHost:27017/mi_blog");

       console.log("Connected to mi-blog")

    } catch (err) {
        cobnsole.log(err);
        throw new Error("No se ha poduido")
    }
}


module.exports = {

    connection
}