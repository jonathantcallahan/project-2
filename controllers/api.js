const db = require('../models')

module.exports = (app) => {

    app.get('/my-pet/api', (req, res) => {
        db.Pets.findAll({}).then(data => {
            res.json(data)
        })
    })

}