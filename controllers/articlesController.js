const db = require('../models');

//Defining methods for the booksController
module.exports = {

    findAll: function (req, res) {
        db.Article
            .find(req.query)
            .sort({ date: -1 })
            .then(articles => res.json(articles))
            .catch(err => res.status(422).json(err));
    },
    findById: function (req, res) {
        db.Article
            .findById(req.params.id)
            .then(article => res.json(article))
            .catch(err => res.status(422).json(err));
    },
    create: function (req, res) {
        db.Article
            .create(req.body)
            .then(article => res.json(article))
            .catch(err => res.status(422).json(err));
    },
    remove: function(req, res) {
      db.Article
        .findById({ _id: req.params.id })
        .then(article => article.remove())
        .then(article => res.json(article))
        .catch(err => res.status(422).json(err));
    }

}