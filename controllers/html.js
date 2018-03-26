const db = require('../models')
const path = require('path')

module.exports = (app) => {

    app.post('/my-pet', (req, res) => {
        console.log(req.body)
        db.Pets.update(
            {lastFed: req.body.time},
           {where: { id:req.body.id }}
        )
        .then(data => console.log(data))
        .catch(err => console.log(err))
    });
    app.get('/', (req, res) => {
        res.sendFile('../public/index.html')
    });
    app.get('/home', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/', 'home.html'))
    })


}