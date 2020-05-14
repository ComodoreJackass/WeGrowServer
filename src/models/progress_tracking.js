// progress_tracking table model
const progressTracking = (sequelize, DataTypes) => {
    const ProgressTracking = sequelize.define('progress_tracking', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        plant_id: {
            type: DataTypes.INTEGER
        },
        started_on: {
            type: DataTypes.DATE
        },
        stage_id: {
            type: DataTypes.INTEGER
        },
        stage_started_on: {
            type: DataTypes.DATE
        },
        last_watered_on: {
            type: DataTypes.DATE
        },
        done:{
            type: DataTypes.BOOLEAN
        },
        has_sensors:{
            type: DataTypes.BOOLEAN
        }
    });

    return ProgressTracking;
};

export default progressTracking;