import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    define:{
        freezeTableName: true,
        timestamps: false
    }
});

sequelize.authenticate().then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const models = {
    Users: sequelize.import('./users'),
    Plants: sequelize.import('./plants'),
    ProgressTracking: sequelize.import('./progress_tracking'),
    Materials: sequelize.import('./materials'),
    PlantComents: sequelize.import('./plant_coments'),
    Sensors: sequelize.import('./sensors'),
    Chat: sequelize.import('./chat')
};

models.ProgressTracking.belongsTo(models.Plants, {  foreignKey : 'plant_id' });
models.ProgressTracking.belongsTo(models.Sensors, {  foreignKey : 'sensor_id' });

export { sequelize };
export default models;