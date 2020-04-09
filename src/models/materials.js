// materials table model
const materials = (sequelize, DataTypes) => {
    const Materials = sequelize.define('materials', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        material: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        plant_id: {
            type: DataTypes.INTEGER
        }
    });

    return Materials;
};

export default materials;