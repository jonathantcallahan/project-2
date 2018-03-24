const db = require('../models')

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
    })


}