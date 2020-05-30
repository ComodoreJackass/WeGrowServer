import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'

const router = Router();

/*const fs = require('fs');
const path = require("path");

const img = fs.readFileSync(path.resolve(__dirname, ('../assets/cherry.jpg')), { encoding: 'base64' });*/


//const plantsImg = [];

/*for (var i = 1; i < 11; i++) {
    plantsImg.push(fs.readFileSync(path.resolve(__dirname, ('../assets/img' + i + '.jpg')), { encoding: 'base64' }));
}*/

//Returns array of all plants objects
router.get('/', authenticateToken, async (req, res) => {
    const plants = await req.context.models.Plants.findAll();

    /*plants.forEach(element => {
        element.setDataValue('image', plantsImg[element.id-1]);
    });*/

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

    /*plants.forEach(element => {
        element.setDataValue('image', plantsImg[element.id-1]);
    });*/

    return res.send(plants);
})

//Inserts new plant object into db
router.post('/insert', async (req, res) => {
    const name = req.body.name;
    const summary = req.body.summary;
    const difficulty = req.body.difficulty;
    const category = req.body.category;
    const image = req.body.image;
    //const image = img;
    const owner = req.body.owner;
    const care = req.body.care;
    const instructions = req.body.instructions;
    const duration = req.body.duration;

    //Lots of checks needed here, I'll add them if there's time
    const plants = await req.context.models.Plants.findAll();

    let id = 0;
    plants.forEach(element => {
        if (element.id > id) {
            id = element.id;
        }
    });

    id += 1;

    try {
        await req.context.models.Plants.create({
            id: id,
            name: name,
            summary: summary,
            difficulty: difficulty,
            category: category,
            image: image,
            owner: owner,
            care: care,
            instructions: instructions,
            duration: duration
        });
        return res.sendStatus(200);
    }
    catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

export default router;
