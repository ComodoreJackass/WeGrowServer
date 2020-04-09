import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'

const router = Router();

//Returns array of all progress objects
router.get('/', authenticateToken, async (req, res) => {
    const progressTracking = await req.context.models.ProgressTracking.findAll();
    return res.send(progressTracking);
});

//Returns array of progress objects by user id
router.post('/byId', authenticateToken, async (req, res) => {
    const userId = req.body.userId;

    //check if userId int
    if(!Number.isInteger(userId) || userId == undefined) return res.sendStatus(406);

    const progressTracking = await req.context.models.ProgressTracking.findAll({
        where: {user_id:userId}
    });
    return res.send(progressTracking);
})

//Inserts new progress object into db
router.post('/insert', async(req, res) => {
    const userId = req.body.userId;
    const plantId = req.body.plantId;
    const startedOn = req.body.startedOn;
    const stageId = req.body.stageId;
    const stageStartedOn = req.body.stageStartedOn;
    const lastWateredOn = req.body.lastWateredOn;
    const done = req.body.done;

    //Lots of checks needed here, I'll add them if there's time
    const progress = await req.context.models.ProgressTracking.findAll();
    let id = progress.length + 1;

    try {
        await req.context.models.ProgressTracking.create({
            id:id,
            user_id: userId,
            plant_id: plantId,
            started_on: startedOn,
            stage_id: stageId,
            stage_started_on: stageStartedOn,
            last_watered_on: lastWateredOn,
            done: done
        });
        return res.sendStatus(200);
    } 
    catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

export default router;