// importing
import express from 'express'
import mongoose from 'mongoose'
import Message from './dbMessages.js'
import Pusher from 'pusher'
import cors from 'cors'
// app config
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
    appId: "1148094",
    key: "61c5fae0f66a0c18ca1d",
    secret: "ed6f6c29829882ff1d19",
    cluster: "ap2",
    useTLS: true
});

// middleware
app.use(express.json());
app.use(cors());
// DB config
const connection_url = 'mongodb+srv://root:root@cluster0.s9ufz.mongodb.net/whatsappdb?retryWrites=true&w=majority';
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})

const db = mongoose.connection

db.once('open', () => {
    console.log('DB connected');

    const msgCollection = db.collection('messagecontents');
    const changeStream = msgCollection.watch();

    changeStream.on('change', change => {
        console.log(change);
        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted',
                {
                    name: messageDetails.name,
                    message: messageDetails.message,
                    timestamp: messageDetails.timestamp,
                    received: messageDetails.received
                })
        } else {
            console.log('Error triggering pusher');
        }
    })
})
// ????


// api routes
app.get('/', (req, res) => {
    res.status(200).send('hello world');
})

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body;

    Message.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});
app.get('/messages/sync', (req, res) => {
    const dbMessage = req.body;

    Messages.find(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    });
});

// listener
app.listen(port, () => { console.log(`listening on port ${port}`) });