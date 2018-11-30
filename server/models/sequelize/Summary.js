module.exports = (db, DataTypes) => {
    const Summary = db.define('Summary', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        rawText: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        authorId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        likes: {
            type: DataTypes.ARRAY(DataTypes.INTEGER),
        },
        imageSrc: {
            type: DataTypes.STRING,
        },
    }, {
        tableName: 'Summaries',
        classMethods: {
            associate: function (models) {
                Summary.belongsTo(models.User, {
                    foreignKey: 'authorId'
                })
            }
        }
    });
    return Summary;
};