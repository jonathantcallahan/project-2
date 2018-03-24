const express = require('express');
const bodyParser = require('body-parser');
const db = require('./models');
const app = express();

//configure body parser
app.use(bodyParser.urlencoded( {extended: true} ));
app.use(bodyParser.json());

app.use(express.static('public'))

const pets = require('./controllers/html')
pets(app)

const PORT = process.argv[2] || 8080;

db.sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}...`))
})
