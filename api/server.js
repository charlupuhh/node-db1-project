const express = require("express");

const accountsRouter = require('../accounts/accountsRouter')

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`<h1>Server is up</h1>`)
})

server.use('/api/accounts', accountsRouter)

module.exports = server;
