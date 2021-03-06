import { Router } from 'express';
import {sequelize} from '../models/index';

const router = Router();

router.post('/', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;

    const users = await req.context.models.Users.findAll();
    let userExists = false;

    users.forEach(user => {
        if(user.username == username)
        {
            userExists = true;
        }
    });
    
    if(userExists) return res.sendStatus(304);

    let id = users.length + 1;
    try {
        await req.context.models.Users.create({
            id: id, 
            username: username,
            password: password,
            email: email,
            created_on: sequelize.literal('CURRENT_TIMESTAMP')
        });
        return res.sendStatus(200);
    } 
    catch(err) {
        console.log(err);
        return res.sendStatus(400);
    }
})


export default router;