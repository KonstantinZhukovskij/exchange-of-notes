const sequelize = require('sequelize');
const db = require('../models/sequelize');

let repository = {};

repository.getFoundText = (searchQuery) => {
    return db.Summary.findAll({
        where: {rawText: sequelize.where(sequelize.fn('LOWER', sequelize.col('rawText')), 'LIKE', '%' + searchQuery + '%')}
    })
};

module.exports = repository;