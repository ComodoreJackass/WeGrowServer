import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../models/index';

const router = Router();

//Returns array of plants comments by plant id
router.post('/byId', authenticateToken, async (req, res) => {
    const plantId = req.body.plantId;

    //check if plantId int
    if (!Number.isInteger(plantId) || plantId == undefined) return res.sendStatus(406);

    const plantComents = await req.context.models.PlantComents.findAll({
        where: { plant_id: plantId }
    });

    return res.send(plantComents);
})

//Inserts new plant comment object into db
router.post('/insert', async (req, res) => {
    const id = uuidv4();
    const plantId = req.body.plantId;
    const userId = req.body.userId;
    const comment = req.body.comment;
    const score = 0;
    const time = sequelize.literal('CURRENT_TIMESTAMP');

    try {
        await req.context.models.PlantComents.create({
            id: id,
            plant_id: plantId,
            user_id: userId,
            comment: comment,
            score: score,
            time: time,
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

//Delete progress item
router.delete('/', authenticateToken, async (req, res) => {
    const commentId = req.body.commentId;

    try {
        const comments = await req.context.models.PlantComents.findOne({
            where: { id: commentId }
        });
        comments.destroy();
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

export default router;