const db = require('../models')

module.exports = (app) => {

    app.get('/my-pet/api', (req, res) => {
        db.Pets.findAll({}).then(data => {
            res.json(data)
        })
    }),
    app.post('/my-pet/api', (req, res) => {
        db.Pets.create({
            name: req.body.name,
            lastFed: Date.now(),
            petType: req.body.petType
        }).then(data => {
            console.log(data)
            res.end()
        })
    })

}