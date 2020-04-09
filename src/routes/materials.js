import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'

const router = Router();

router.get('/', authenticateToken, async (req, res) => {
    const materials = await req.context.models.Materials.findAll();
    return res.send(materials);
});

export default router;