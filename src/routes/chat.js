import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../models/index';

const router = Router();

//Returns array of comments by user id
router.post('/byId', authenticateToken, async (req, res) => {
    const userId = req.body.userId;

    //check if plantId int
    if (!Number.isInteger(userId) || userId == undefined) return res.sendStatus(406);

    const comments = await req.context.models.Chat.findAll({
        where: {
            [sequelize.or]: [
                { sender: userId },
                { reciever: userId }
            ]
        }
    });

    return res.send(comments);
})

//Inserts new comment object into db
router.post('/insert', async (req, res) => {
    const id = uuidv4();
    const message = req.body.message;
    const sender = req.body.senderId;
    const reciever = req.body.recieverId;
    const time = sequelize.literal('CURRENT_TIMESTAMP');

    try {
        await req.context.models.Chat.create({
            id: id,
            message: message,
            sender: sender,
            reciever: reciever,
            time: time,
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

export default router;