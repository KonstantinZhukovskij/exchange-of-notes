module.exports = (db, DataTypes) => {
    const Question = db.define('Question', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        text: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        addresseeId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Questions',
    });
    return Question;
};