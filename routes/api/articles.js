const router = require('express').Router();
const articlesController = require('../../controllers/articlesController')

// // Matches with "/api/articles"
// router.route("/")
//     .get(articlesController.findAll)
//     .post(articlesController.create);

// Matches with "/api/articles"
router.get("/", (req, res) => {
    articlesController.findAll(req, res)
})

router.post("/", (req, res) => {
    articlesController.create(req, res)
})

// Matches with "/api/articles/id"
router.route("/:id")
    .get(articlesController.findById)
    .delete(articlesController.remove);

// Matches with "/api/articles/id"
router.get("/:id",(req,res)=>{
    articlesController.findById(req, res)
})

router.delete("/:id",(req,res)=>{
    articlesController.remove(req,res)
})

module.exports = router;
