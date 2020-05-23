import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'
import { v4 as uuidv4 } from 'uuid';
import { sequelize } from '../models/index';

const router = Router();

//Returns array of sensors
router.post('/', authenticateToken, async (req, res) => {
    const sensors = await req.context.models.Sensors.findAll();
    return res.send(sensors);
})

//Inserts new sensor object into db
router.post('/insert', async (req, res) => {
    const id = uuidv4();
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    const topic = req.body.topic;

    try {
        await req.context.models.Sensors.create({
            id: id,
            name: name,
            username: username,
            password: password,
            topic: topic,
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

//Delete sensor item
router.delete('/', authenticateToken, async (req, res) => {
    const sensorId = req.body.sensorId;

    try {
        const sensor = await req.context.models.Sensors.findOne({
            where: { id: sensors }
        });
        sensor.destroy();
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

export default router;