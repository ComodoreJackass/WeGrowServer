// chat table model
const chat = (sequelize, DataTypes) => {
    const Chat = sequelize.define('chat', {
        id:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING
        },
        sender: {
            type: DataTypes.INTEGER
        },
        reciever: {
            type: DataTypes.INTEGER
        },
        time: {
            type: DataTypes.DATE
        },
    });

    return Chat;
};

export default chat;