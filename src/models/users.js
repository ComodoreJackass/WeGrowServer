// users table model
const users = (sequelize, DataTypes) => {
    const User = sequelize.define('users', {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        },
        email: {
            type: DataTypes.STRING
        },
        created_on: {
            type: DataTypes.DATE
        }
    });

    return User;
};

export default users;