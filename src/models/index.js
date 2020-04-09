import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DATABASE_URI, {
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
    GrowthStages: sequelize.import('./growth_stages'),
    GrowthConditions: sequelize.import('./growth_conditions'),
    Materials: sequelize.import('./materials')
};

// Can be used for creating one to many connections and stuff,
// but we can make do without additional complexity for now
/*Object.keys(models).forEach(key => {
    if ('associate' in models[key]) {
        models[key].associate(models);
    }
});*/

export { sequelize };
export default models;