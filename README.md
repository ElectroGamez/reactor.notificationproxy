# Reactor Notification Proxy
The needed this Notification Proxy for Reactor Android app.
to run this proxy yourself you need to generate your own Google FCM keys. More information [here](https://firebase.google.com/docs/admin/setup/)

## Example api call

```json
{
	"title": "Alert message",
	"body": "Importand message from Reactor!",
	"registrationToken": "registrationToken from device app."
}
```