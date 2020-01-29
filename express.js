require('dotenv').config();

const firebase = require('./firebase.js')
const express = require('express');
const app = express();
app.use(express.json());


app.post('/api/sendNotification', (req, res) => {
    prepairNotification(req.body, res);
});

app.listen(process.env.PORT || 3000, () => console.log(`Example app listening on port ${process.env.PORT || 3000}!`));


function prepairNotification(json, res) {
    console.log(json);

    if (json.registrationToken !== undefined && json.registrationToken.length >= 152) {
        if ((json.body !== undefined) && (json.title !== undefined)) {
            firebase.sendNotification(json.title, json.body, json.registrationToken, callback => {
                res.status(400).send({error: callback});
            });
        } else {
            res.status(400).send({error: "Invalid title and/or body"});
        }
    } else {
        res.status(400).send({error: "Invalid Registration Token"});
    }
}