const db = require('../models/sequelize');

let repository = {};

repository.createSummary = (summary) => {
    if (summary.title !== null && summary.description !== null && summary.text !== null) {
        const dbSummary = db.Summary.build(summary);
        return dbSummary.save()
    } else {
        return summary.status(500)
    }
};

repository.getAllSummaries = () => {
    return db.Summary.findAll({
        include: [{
            model: db.User
        }]
    });
};

repository.getSummaryById = (id) => {
    return db.Summary.findById(id, {
        include: [{
            model: db.User
        }]
    })
};

repository.getAllAuthorSummaries = (authorId) => {
    return db.Summary.findAll({
        where: {authorId: authorId}
    })
};

repository.updateSummary = (summaryId, data) => {
    return db.Summary.update(data,
        {
            where: {id: summaryId}
        });
};

module.exports = repository;