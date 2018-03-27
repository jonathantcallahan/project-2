const db = require('../models')

module.exports = (app) => {

    app.get('/my-pet/api/:name', (req, res) => {
        db.Pets.findAll({where: {name: req.params.name}}).then(data => {
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
    }),
    app.get('/home/api', (req, res) => {
        db.Pets.findAll({})
        .then(data => res.json(data))
    });
    app.delete('/home/api/:id', (req, res) => {
        db.Pets.destroy({where: {id:req.params.id}})
        .then(data => {
            conosle.log(data)
            res.end()
        })
    })

}