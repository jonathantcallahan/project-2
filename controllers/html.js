const db = require('../models')
const path = require('path')

module.exports = (app) => {

    app.post('/my-pet', (req, res) => {
        console.log(req.body)
        db.Pets.update(
            {lastFed: req.body.time},
           {where: { name:req.body.name }}
        )
        .then(data => console.log(data))
        .catch(err => console.log(err))
    });
    app.get('/pet/:name', (req, res) => {
        res.sendFile(path.join(__dirname, './../public/', 'index.html'))
    });
    app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/', 'home-2.html'))
    })


}