// growth_conditions table model
const growthConditions = (sequelize, DataTypes) => {
    const GrowthConditions = sequelize.define('growth_conditions', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        min_temp: {
            type: DataTypes.INTEGER
        },
        max_temp: {
            type: DataTypes.INTEGER
        },
        watering_frequency: {
            type: DataTypes.INTEGER
        },
        watering_text: {
            type: DataTypes.INTEGER
        }
    });

    return GrowthConditions;
};

export default growthConditions;