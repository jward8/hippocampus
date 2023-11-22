const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');

const admin = require('firebase-admin');
const db = require('./firebase');

const app = express();
// app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended: true,
    }),
);

app.use('/', routes);

//Set Port 3000

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});