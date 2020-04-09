import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
    const growthStages = await req.context.models.GrowthStages.findAll();
    return res.send(growthStages);
});

router.post('/byId', authenticateToken, async (req, res) => {
    const growthStageId = req.body.growthStageId;

    if (!Number.isInteger(growthStageId) || growthStageId == undefined) return res.sendStatus(406);

    const growthStages = await req.context.models.GrowthStages.findAll({
        where: { id: growthStageId }
    });
    return res.send(growthStages);
})

export default router;