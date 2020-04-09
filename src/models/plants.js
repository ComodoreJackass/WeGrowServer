
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
        }
    });

    return Plant;
};

export default plants;