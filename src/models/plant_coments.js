// plant coments table model
const plantComents = (sequelize, DataTypes) => {
    const PlantComents = sequelize.define('plant_coments', {
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        plant_id: {
            type: DataTypes.INTEGER
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        comment: {
            type: DataTypes.STRING
        },
        score: {
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.DATE
        },
    });

    return PlantComents;
};

export default plantComents;