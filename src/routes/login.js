import { Router } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/', async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const users = await req.context.models.Users.findAll();
    let userExists = false;

    users.forEach(user => {
        if(user.username == username && user.password == password)
        {
            userExists = true;
        }
    });
    
    if(!userExists) return res.sendStatus(403);

    const user = { name: username };

    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
    res.json({ accessToken: accessToken });
})


export default router;