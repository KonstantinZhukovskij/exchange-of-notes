const SearchRepository = require('../repositories/SearchRepository');

exports.getFoundText = (req, res) => {
    SearchRepository.getFoundText(req.query.rawText.toLowerCase())
        .then((foundText) => {
            res.json(foundText)
        })
        .catch((error) => {
            res.json(error)
        })
};
