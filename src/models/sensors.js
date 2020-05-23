// sensors table model
const sensors = (sequelize, DataTypes) => {
    const Sensors = sequelize.define('sensors', {
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        topic: {
            type: DataTypes.STRING
        },
    });

    return Sensors;
};

export default sensors;