import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
    const growthConditions = await req.context.models.GrowthConditions.findAll();
    return res.send(growthConditions);
});

router.post('/byId', authenticateToken, async (req, res) => {
    const growthConditionsId = req.body.growthConditionsId;

    if (!Number.isInteger(growthConditionsId) || growthConditionsId == undefined) return res.sendStatus(406);

    const growthConditions = await req.context.models.GrowthConditions.findAll({
        where: { id: growthConditionsId }
    });
    return res.send(growthConditions);
})

export default router;