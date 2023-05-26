const { restart } = require("nodemon")
const validator = require('validator');
const Articles = require('../models/Articles')
const {validateArticle} = require('../helpers/validate')

const testing = (req, res) => {

    return res.status(200).json({

        mensaje: " Soy una accion de prueba"
    })
}

const create = (req, res) => {

    // Recoger parametros por post a guardar
    let params = req.body


    // validar datos

    try{
        validateArticle(params)
    
        } catch (err) {
            return res.status(400).json({
    
                status: "error",
                mensaje: "faltan datos"
    
            })
        }
    

    // Crear el objeto a guardar
    const article = new Articles(params)

    // Asignar Valores(Manual o automatico)



    //guardar en la base de datos

    article.save()
        .then(function (result) {
            res.status(200).json({
                status: "success",
                mensaje: "Guardado con exito",
                article: result
            })
        })
        .catch(function (err) {
            res.status(400).json({
                status: err,
                mensaje: "No se ha podido Guardar"
            })
        })


}

const getArticles = (req, res) => {


    let request = Articles.find();
    request.sort({ fecha: 1 }).exec()
        .then(function (result) {
            res.status(200).json({
                status: "success",
                mensaje: "Listado con exito",
                article: result
            })
        })
        .catch(function (err) {
            res.status(404).json({
                status: err,
                mensaje: "No se ha podido Listar"
            })
        })

}

const getOneArticle = (req, res) => {

    let idArticle = req.params.id
    let request = Articles.findById(idArticle)
        .then(function (result) {
            res.status(200).json({
                status: "success",
                mensaje: "Listado con exito",
                article: result
            })
        })
        .catch(function (err) {
            res.status(404).json({
                status: err,
                mensaje: "No se ha podido Listar"
            })
        })

}

const removeArticle = (req, res) => {

    let idArticle = req.params.id
    let request = Articles.findOneAndDelete({ _id: idArticle })
        .then(function (result) {
            res.status(200).json({
                status: "success",
                mensaje: "Borrado con exito",
                article: result
            })
        })
        .catch(function (err) {
            res.status(404).json({
                status: err,
                mensaje: "No se ha podido Borrar"
            })
        })

}


const editArticle = (req, res) => {

    let idArticle = req.params.id
    let params = req.body


    try{
    validateArticle(params)

    } catch (err) {
        return res.status(400).json({

            status: "error",
            mensaje: "faltan datos"

        })
    }


    Articles.findOneAndUpdate({ _id: idArticle }, params, {new: true})
        .then(function (result) {
            res.status(200).json({
                status: "success",
                mensaje: "Actualizado con exito",
                article: result
            })
        })
        .catch(function (err) {
            res.status(404).json({
                status: err,
                mensaje: "No se ha podido Actualizar"
            })
        })

}







module.exports = {

    testing,
    create,
    getArticles,
    getOneArticle,
    removeArticle,
    editArticle
}