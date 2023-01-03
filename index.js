const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const redis = require('redis');
const cors = require('cors');
const { REDIS_PORT } = require('./config/config');
const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();
const mongoURL = 'PLACEHOLDER';


let RedisStore = require('connect-redis')(session);

mongoose.connect(mongoURL)
    .then(() => console.log('Connected to MongoDB!'))
    .catch((e) => console.log(e));

let redisClient = redis.createClient({
        host: REDIS_URL,
        port: REDIS_PORT,
});
app.enable('trust proxy');
app.use(cors({}));
app.use(session({
    store: new RedisStore({client: redisClient  }),
    secret: SESSION_SECRET,
    cookie: {
        secure: false,
        resave: false,
        saveUnitialized: false,
        httpOnly: true,
        maxAge: 60000,
    }
}));
                
app.use(express.json());

app.get("/api/v1", (req, res) => {
    res.send("<h2>Hello World<h2>");
    console.log('here i am');
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port ${port}`)
});

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

