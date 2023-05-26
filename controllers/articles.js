const { restart } = require("nodemon")
const validator = require('validator');
const Articles = require('../models/Articles')
const { validateArticle } = require('../helpers/validate')
const fs = require('fs');
const path = require('path')
const testing = (req, res) => {

    return res.status(200).json({

        mensaje: " Soy una accion de prueba"
    })
}

const create = (req, res) => {

    // Recoger parametros por post a guardar
    let params = req.body


    // validar datos

    try {
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


    try {
        validateArticle(params)

    } catch (err) {
        return res.status(400).json({

            status: "error",
            mensaje: "faltan datos"

        })
    }


    Articles.findOneAndUpdate({ _id: idArticle }, params, { new: true })
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

const upload = (req, res) => {




    let nameFile = req.file.originalname
    let splitName = nameFile.split('\.')
    let fileExtension = splitName[1]

    if (fileExtension != 'png' && fileExtension != 'jpeg' && fileExtension != 'jpg') {


        fs.unlink(req.file.path, (err) => {


            return res.status(400).json({
                status: 'error',
                message: 'Formato invalido'

            })
        })
    } else {

        let idArticle = req.params.id




        Articles.findOneAndUpdate({ _id: idArticle }, { imagen: req.file.filename }, { new: true })
            .then(function (result) {
                res.status(200).json({
                    status: "success",
                    mensaje: "Actualizado con exito",
                    article: result,
                    fichero: req.file

                })
            })
            .catch(function (err) {
                res.status(404).json({
                    status: err,
                    mensaje: "No se ha podido Actualizar",
                    fichero: req.file
                })
            })




    }


}


const image = (req, res) => {

    let fichero = req.params.fichero
    let route = './images/' + fichero;
    fs.stat(route, (error, existe,) => {
        if (existe) {
            return res.sendFile(path.resolve(route))
        } else {
            return res.status(404).json({

                status: 'error',
                mensaje: "imagen no existe",
                existe,
                fichero,
                route
            })
        }
    })
}


const buscador = (req, res) => {
    // Sacar el string de busqueda
    let busqueda = req.params.busqueda;

    // Find OR 
    Articles.find({
        "$or": [
            { "titulo": { "$regex": busqueda, "$options": "i" } },
            { "contenido": { "$regex": busqueda, "$options": "i" } },
        ]
    })
        .sort({ fecha: -1 })
        .exec()
        .then(function (result) {
            res.status(200).json({
                status: "success",
            articulos: result

            })
        })
        .catch(function (err) {
            res.status(404).json({
                status: "error",
                mensaje: "No se han encontrado artículos"
            })
        })


}










module.exports = {

    testing,
    create,
    getArticles,
    getOneArticle,
    removeArticle,
    editArticle,
    upload,
    image,
    buscador
}