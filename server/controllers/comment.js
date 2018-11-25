const CommentRepository = require('../repositories/CommentRepository');

exports.postComment = (req, res) => {
    CommentRepository.createComment({
        text: req.body.text,
        authorId: req.body.authorId,
        summaryId: req.body.summaryId
    })
        .then((comment) => {
            res.json(comment)
        })
        .catch((error) => {
            res.json(error)
        })

};

exports.getAllCommentsToSummary = (req, res) => {
    CommentRepository.getAllCommentsToSummary(req.params.id)
        .then((allCommentsToSummary) => {
            res.json(allCommentsToSummary)
        })
        .catch((error) => {
            res.json(error)
        })
};