const sequelize = require('sequelize');
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

repository.getPaginationSummaries = (limit, offset) => {
    return db.Summary.findAll({
        limit: limit,
        offset: offset,
        subQuery: false,
        include: [{
            model: db.User
        }],
        order: [
            ['createdAt', 'DESC']
        ]
    }).then((summaries) => {
        return db.Summary.count()
            .then((count) => {
                return {
                    summaries: summaries,
                    count: count
                }
            })
    });
};

repository.getPopularSummaries = () => {
    return db.Summary.findAll({
        limit: 5,
        include: [{
            model: db.User
        }],
        order: [
            [sequelize.fn('array_length', sequelize.col('likes'), 1), 'DESC']
        ]
    })
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

repository.deleteSummary = (summaryId) => {
    return db.Summary.destroy(
        {
            where: {id: summaryId}
        });
};

module.exports = repository;