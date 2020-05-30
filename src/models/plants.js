
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
        owner: {
            type: DataTypes.STRING
        },
        image: {
            type: DataTypes.STRING
        },
        care: {
            type: DataTypes.STRING
        },
        instructions: {
            type: DataTypes.STRING
        },
        duration: {
            type: DataTypes.STRING
        },
        materials: {
            type: DataTypes.STRING
        },
    });

    return Plant;
};

export default plants;