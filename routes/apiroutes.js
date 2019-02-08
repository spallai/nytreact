const bookController = require("../controllers/bookController");
const router = require("express").Router();

router.route("/api/books/")
.get(bookController.findSaved)
.post(bookController.saveBook)

router.route("/api/books/:id")
.delete(bookController.removeBook)


module.exports = router