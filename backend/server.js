const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {graphqlHTTP} = require('express-graphql');
const RootQuery = require('./schema/schema');

const app = express();

app.use(cors());

app.use(
    '/graphql',
    graphqlHTTP({
        schema: RootQuery,
        graphiql: true
    }),
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE, OPTIONS');
    if(req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
})

/*app.get('/api/1.0', function (req, res) {
    res.status(200).send('API works.');
});*/

/*Роуты для API (СДЕЛАТЬ ВЕРСИЮ 1,0)*/
/*app.post('/api/1.0/auth/register', UserController.APIadd); /!*создать юзера*!/
app.get('/api/1.0/me', VerifyToken, UserController.APIgetMe); /!*получить юзера*!/
app.post('/api/1.0/login', UserController.APIlogin); /!*войти*!/
app.get('/api/1.0/logout', UserController.APIlogout); /!*выйти*!/*/

mongoose.connect('mongodb://cheklist_user_db:c7gTUO1IRzBGgLhO@cluster0-shard-00-00-c2fuc.mongodb.net:27017,cluster0-shard-00-01-c2fuc.mongodb.net:27017,cluster0-shard-00-02-c2fuc.mongodb.net:27017/checklist?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
);

app.listen(3012, function () {
    console.log('API app started on :3012');
});

