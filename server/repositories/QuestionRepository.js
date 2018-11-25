const db = require('../models/sequelize');

let repository = {};

repository.createQuestion = (question) => {
    const dbQuestion = db.Question.build(question);
    return dbQuestion.save();
};

repository.getAllQuestions = (addresseeId) => {
    return db.Question.findAll({
        where: {addresseeId: addresseeId}
    })
};

module.exports = repository;