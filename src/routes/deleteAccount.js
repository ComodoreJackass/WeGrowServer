import { Router } from 'express';
import authenticateToken from '../Authentication/authenticate'

const router = Router();

router.delete('/', authenticateToken, async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    //delete user
    try {
        const users = await req.context.models.Users.findOne({
            where: { username: username, password: password }
        });
        const userId = users.id;
        const progressTracking = await req.context.models.ProgressTracking.findAll({
            where: { user_id: userId }
        });


        if (progressTracking.length > 0) {
            progressTracking.forEach(element => {
                element.destroy();
            });
        }
        users.destroy();
        return res.sendStatus(200);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400);
    }
})

export default router;