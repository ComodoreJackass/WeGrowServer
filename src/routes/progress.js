import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'
import { sequelize } from '../models/index';

const router = Router();

//Returns array of all progress objects
router.get('/', authenticateToken, async (req, res) => {
    const progressTracking = await req.context.models.ProgressTracking.findAll({
        include: [{ all: true }]
    });
    return res.send(progressTracking);
});

//Returns array of progress objects by user id
router.post('/byId', authenticateToken, async (req, res) => {
    const userId = req.body.userId;

    //check if userId int
    if (!Number.isInteger(userId) || userId == undefined) return res.sendStatus(406);

    const progressTracking = await req.context.models.ProgressTracking.findAll({
        where: { user_id: userId },
        include: [{ all: true }]
    });
    return res.send(progressTracking);
})

//Inserts new progress object into db
router.post('/insert', async (req, res) => {
    const userId = req.body.userId;
    const plantId = req.body.plantId;
    const stageId = req.body.stageId;
    const done = req.body.done;

    //Lots of checks needed here, I'll add them if there's time
    const progress = await req.context.models.ProgressTracking.findAll();
    let id = progress.length + 1;

    try {
        await req.context.models.ProgressTracking.create({
            id: id,
            user_id: userId,
            plant_id: plantId,
            started_on: sequelize.literal('CURRENT_TIMESTAMP'),
            stage_id: stageId,
            stage_started_on: sequelize.literal('CURRENT_TIMESTAMP'),
            last_watered_on: sequelize.literal('CURRENT_TIMESTAMP'),
            done: done
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

//Use to change stageId of some progress row
router.patch('/stageId', async (req, res) => {
    const progressId = req.body.progressId;
    const stageId = req.body.stageId;

    if (!Number.isInteger(progressId) || progressId == undefined) return res.sendStatus(406);
    if (!Number.isInteger(stageId) || stageId == undefined) return res.sendStatus(406);

    try {
        await req.context.models.ProgressTracking.update({ stage_id: stageId }, {
            where: {
                id: progressId
            }
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

//Use to change stage_started_on of some progress row
router.patch('/stageStartedOn', async (req, res) => {
    const progressId = req.body.progressId;

    if (!Number.isInteger(progressId) || progressId == undefined) return res.sendStatus(406);

    try {
        await req.context.models.ProgressTracking.update({ stage_started_on: sequelize.literal('CURRENT_TIMESTAMP') }, {
            where: {
                id: progressId
            }
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

//Use to change last_watered_on of some progress row
router.patch('/lastWateredOn', async (req, res) => {
    const progressId = req.body.progressId;

    if (!Number.isInteger(progressId) || progressId == undefined) return res.sendStatus(406);

    try {
        await req.context.models.ProgressTracking.update({ last_watered_on: sequelize.literal('CURRENT_TIMESTAMP') }, {
            where: {
                id: progressId
            }
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

//Use to change done of some progress row
router.patch('/done', async (req, res) => {
    const progressId = req.body.progressId;
    const done = req.body.done;

    if (!Number.isInteger(progressId) || progressId == undefined) return res.sendStatus(406);
    if (done == undefined) return res.sendStatus(406);

    try {
        await req.context.models.ProgressTracking.update({ done: done }, {
            where: {
                id: progressId
            }
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

export default router;