// growth_stager table model
const growthStages = (sequelize, DataTypes) => {
    const GrowthStages = sequelize.define('growth_stages', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        plant_id: {
            type: DataTypes.INTEGER
        },
        stage_number: {
            type: DataTypes.INTEGER
        },
        description: {
            type: DataTypes.STRING
        },
        growth_id: {
            type: DataTypes.INTEGER
        },
        stage_duration: {
            type: DataTypes.STRING
        },
        stage_title: {
            type: DataTypes.STRING
        },
        next_stage_text: {
            type: DataTypes.STRING
        }
    });

    return GrowthStages;
};

export default growthStages;