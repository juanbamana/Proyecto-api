const express = require('express');
const router = express.Router()

const ArticleController = require("../controllers/articles")
// Rutas Prueba


router.get("/ruta-prueba", ArticleController.testing)

// Ruta Util 
router.post("/create", ArticleController.create)

router.get("/articles", ArticleController.getArticles)
router.get("/articles/:id", ArticleController.getOneArticle)
router.delete("/articles/:id", ArticleController.removeArticle)
router.put("/articles/:id", ArticleController.editArticle)


module.exports = router;



