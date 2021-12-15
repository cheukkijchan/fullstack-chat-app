"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRoomUsers = exports.userLeave = exports.getCurrentUser = exports.userJoin = void 0;
const users = [];
const userJoin = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);
    return user;
};
exports.userJoin = userJoin;
const getCurrentUser = (id) => {
    return users.find((user) => user.id === id);
};
exports.getCurrentUser = getCurrentUser;
const userLeave = (id) => {
    const index = users.findIndex((user) => user.id == id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
    return;
};
exports.userLeave = userLeave;
const getRoomUsers = (room) => {
    return users.filter((user) => user.room === room);
};
exports.getRoomUsers = getRoomUsers;
//# sourceMappingURL=users.js.map