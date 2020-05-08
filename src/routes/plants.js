import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'

const router = Router();

const fs = require('fs');
const path = require("path");

const plantsImg = [];
for (var i = 1; i < 11; i++) {
    plantsImg.push(fs.readFileSync(path.resolve(__dirname, ('../assets/img' + i + '.jpg')), { encoding: 'base64' }));
}

//Returns array of all plants objects
router.get('/', authenticateToken, async (req, res) => {
    const plants = await req.context.models.Plants.findAll();

    plants.forEach(element => {
        element.setDataValue('image', plantsImg[element.id-1]);
    });

    return res.send(plants);
});

//Returns array of all plants objects
router.get('/test', async (req, res) => {
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
    
    plants.forEach(element => {
        element.setDataValue('image', plantsImg[element.id-1]);
    });

    return res.send(plants);
})

export default router;