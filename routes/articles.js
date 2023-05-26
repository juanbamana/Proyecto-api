const express = require('express');
const router = express.Router()

const ArticleController = require("../controllers/articles")

const multer = require('multer');


const imageStorages = multer.diskStorage({

    destination: function(req,file, cb){
        cb(null, './images/')
    },

    filename: function(req,file, cb){
        cb(null, 'article' + Date.now() + file.originalname)
    }
})

const uploads = multer({storage: imageStorages})
// Rutas Prueba


router.get("/ruta-prueba", ArticleController.testing)

// Ruta Util 
router.post("/create", ArticleController.create)

router.get("/articles", ArticleController.getArticles)
router.get("/articles/:id", ArticleController.getOneArticle)
router.delete("/articles/:id", ArticleController.removeArticle)
router.put("/articles/:id", ArticleController.editArticle)
router.post("/upload/:id", [uploads.single('file0')], ArticleController.upload)
router.get("/imagen/:fichero", ArticleController.image)
router.get("/buscar/:busqueda", ArticleController.buscador);


module.exports = router;



