"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const listOfRoom_1 = require("./utils/listOfRoom");
const message_1 = require("./utils/message");
const users_1 = require("./utils/users");
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
    },
});
const botName = 'Chat Bot';
app.get('/rooms', (req, res) => {
    res.json(listOfRoom_1.rooms);
});
io.on('connection', (socket) => {
    socket.on('joinRoom', ({ username, room }) => {
        const user = (0, users_1.userJoin)(socket.id, username, room);
        socket.join(user.room);
        socket.emit('message', (0, message_1.formatMessage)(botName, `Joined ${room}. Welcome to chat`));
        socket.broadcast
            .to(user.room)
            .emit('message', (0, message_1.formatMessage)(botName, `${user.username} has joined the Chat`));
        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: (0, users_1.getRoomUsers)(user.room),
        });
    });
    socket.on('chatMessage', ({ username, message }) => {
        io.emit('message', (0, message_1.formatMessage)(username, message));
    });
    socket.on('leaveRoom', () => {
        const user = (0, users_1.userLeave)(socket.id);
        if (user) {
            socket.leave(user.room);
            console.log(`${user.username} left via leave room `);
            io.to(user.room).emit('message', (0, message_1.formatMessage)(botName, `${user.username} has left the Chat`));
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: (0, users_1.getRoomUsers)(user.room),
            });
        }
    });
    socket.on('disconnect', () => {
        const user = (0, users_1.userLeave)(socket.id);
        if (user) {
            socket.leave(user.room);
            console.log(`${user.username} left `);
            io.to(user.room).emit('message', (0, message_1.formatMessage)(botName, `${user.username} has left the Chat`));
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: (0, users_1.getRoomUsers)(user.room),
            });
        }
    });
});
httpServer.listen(4000, () => {
    console.log('server started at port 4000');
});
//# sourceMappingURL=index.js.map