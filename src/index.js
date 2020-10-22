const express = require('express');
const server  = express();
const TaskRoutes = require('./routes/TaskRoutes');

server.use(express.json());
server.use('/', TaskRoutes);

server.listen(3000, () => {
    console.log('API');
});