import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'

const router = Router();

//Returns array of all plants objects
router.get('/', authenticateToken, async (req, res) => {
    const plants = await req.context.models.Plants.findAll();
    return res.send(plants);
});

//Returns array of plants objects by plant id
router.post('/byId', authenticateToken, async (req, res) => {
    const plantId = req.body.plantId;

    //check if plantId int
    if (!Number.isInteger(plantId) || plantId == undefined) return res.sendStatus(406);

    const plants = await req.context.models.Plants.findAll({
        where: { id: plantId }
    });
    return res.send(plants);
})

export default router;