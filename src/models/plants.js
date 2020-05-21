
// plants table model
const plants = (sequelize, DataTypes) => {
    const Plant = sequelize.define('plants', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        summary: {
            type: DataTypes.STRING
        },
        difficulty: {
            type: DataTypes.STRING
        },
        category: {
            type: DataTypes.STRING
        },
        subcategory: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.BLOB
        },
        username: {
            type: DataTypes.STRING
        },
    });

    return Plant;
};

export default plants;