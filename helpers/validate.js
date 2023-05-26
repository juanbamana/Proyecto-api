
const validator = require('validator');


const validateArticle = (params) =>{

    let Validar_titulo = !validator.isEmpty(params.titulo) && validator.isLength(params.titulo, { min: 3, max: 45 })

    if (!Validar_titulo) {

        throw new Error("Invalid information")
    }

}

module.exports ={validateArticle} 