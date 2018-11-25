const QuestionRepository = require('../repositories/QuestionRepository');

exports.createQuestion = (req, res) => {
    QuestionRepository.createQuestion({
        text: req.body.text,
        authorId: req.body.authorId,
        addresseeId: req.body.addresseeId
    })
        .then((question) => {
            res.json(question)
        })
        .catch((error) => {
            res.json(error)
        })
};

exports.getAllQuestions = (req, res) => {
    QuestionRepository.getAllQuestions(req.query.id)
        .then((allQuestions) => {
            res.json(allQuestions)
        })
        .catch((error) => {
            res.json(error)
        })
};