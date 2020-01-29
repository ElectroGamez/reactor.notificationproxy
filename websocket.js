const ws = require('ws');
const firebase = require('./firebase.js')

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', connection => {
    connection.on('message', data => {
        try {
            JSON.parse(data);
        } catch (e) {
            connection.send("Did not receive a valid JSON");
            connection.close();
        } finally {
            prepairNotification(data, connection);
        }
    });
});


function prepairNotification(data, connection) {
    let json = JSON.parse(data);

    if (json.registrationToken !== undefined && json.registrationToken.length >= 152) {
    //token looks ok.
        if ((json.body !== undefined) && (json.title !== undefined)) {
            firebase.sendNotification(json.title, json.body, json.registrationToken, callback => {
                connection.send(callback);
                connection.close();
            });
        } else {
            connection.send("Not good title/body");
            connection.close();
        }
    } else {
        connection.send("Not good token");
        connection.close();
    }
}