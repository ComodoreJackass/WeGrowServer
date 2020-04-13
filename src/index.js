import 'dotenv/config';

import cors from 'cors';
import express from 'express';
import routes from './routes';

import models, { sequelize } from './models';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
    req.context = {
        models,
    };
    next();
});


app.get('/', (req, res) => res.send('Hello World!'));
app.use('/login', routes.login);
app.use('/register', routes.register);

app.use('/plants', routes.plants);
app.use('/progress', routes.progress);
app.use('/growthStages', routes.growthStages);
app.use('/growthConditions', routes.growthConditions);
app.use('/materials', routes.materials);
app.use('/deleteAccount', routes.deleteAccount);

app.listen(process.env.PORT, () =>
    console.log(`Example app listening on port ${process.env.PORT}!`),
);