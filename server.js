import express from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors'

const app = express();

app.use(cors({
    // origin: 'https://notepad-five-tau.vercel.app',
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 200,
}));

const instance = app.listen(5000, () => {
    console.log("server is listening")
})

const wss = new WebSocketServer({ server: instance });

wss.on('connection', (ws) => {

    ws.send('Hello, you are now connected to the WebSocket server.');

    function broadcast(message) {
        wss.clients.forEach((client) => {
            client.send(message);
        });
    }

    ws.on('message', (message) => {
        broadcast(message.toString());
    });

    ws.on('open', (message) => {
        broadcast("hello evry one");
    });

    ws.on('close', () => {
        console.log('Client disconnected');
    });
});
