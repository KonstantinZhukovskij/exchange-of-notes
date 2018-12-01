module.exports = (db, DataTypes) => {
    const Comment = db.define('Comment', {
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
        summaryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        tableName: 'Comments',
        classMethods: {
            associate: (models) => {
                Comment.belongsTo(models.User, {
                    foreignKey: "authorId"
                })
            }
        }
    });
    return Comment;
};