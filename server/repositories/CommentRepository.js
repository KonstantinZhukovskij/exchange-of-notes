const db = require('../models/sequelize');

let repository = {};

repository.createComment = (comment) => {
    const dbComment = db.Comment.build(comment);
    return dbComment.save();
};

repository.getAllCommentsToSummary = (summaryId) => {
    return db.Comment.findAll({
        where: {summaryId: summaryId},
        include: [{
            model: db.User
        }]
    })
};

module.exports = repository;