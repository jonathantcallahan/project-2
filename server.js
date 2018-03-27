const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();

//configure body parser
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

app.use(express.static('public'))

const pets = require('./controllers/html')
const petsApi = require('./controllers/api')
pets(app)
petsApi(app)

const PORT = process.env.PORT || process.argv[2] || 8080;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
})
