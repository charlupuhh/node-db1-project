const express = require('express')

const db = require('../data/dbConfig.js');
const { from } = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {

    db('accounts')
        .then(accounts => {
            res.status(200).json({data: accounts});
        })
        .catch(error => {
            console.log(error);
            res.status(500).jason({ error: error.message})
        })
})

router.get('/:id', (req, res) => {
    const accountsId = req.params.id;

    db('accounts')
    .where({ id: accountsId })
    .then(accounts => {
        res.status(200).json({ accounts })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error:error.message })
    })
})

router.post('/', (req, res) => {
    const body =  req.body
    db('accounts')
    .insert(body).returning('id')
    .then(ids => {
        res.status(201).json({ inserted: ids })
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error:error.message })
    })
})

router.put('/:id', (req, res) => {
    const changes = req.body;
    const accountsId = req.params.id;

    db('accounts')
    .where({ id: accountsId })
    .update(changes)
    .then(count => {
        if(count){
            res.status(200).json({ message: 'update successful', data: changes })
        } else {
            res.status(404).json({ message: ' Id not found.'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error:error.message })
    })
})

router.delete('/:id', (req, res) => {
    const accountsId = req.params.id;

    db('accounts')
    .where({ id: accountsId })
    .del()
    .then(count => {
        if(count){
            res.status(204).end();
        } else {
            res.status(404).json({ message: ' Id not found.'})
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({ error:error.message })
    })
})

module.exports = router