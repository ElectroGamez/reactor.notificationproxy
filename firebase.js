require('dotenv').config()
const admin = require("firebase-admin");
const serviceAccount = require("./firebase-adminsdk.json");

//Error check for .env file
if (!process.env.DATABASE_URL) throw new Error("Database URL was not provided in .env file.");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL
});

function sendNotification(title, body, registrationToken, callback) {
    var message = {
        notification: {
            title: title,
            body: body
        },
        token: registrationToken
    };

    // Send a message to the device corresponding to the provided
    // registration token.
    admin.messaging().send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log('Successfully sent message:', response);
            callback("Data was send to FMS");
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

module.exports.sendNotification = sendNotification;


