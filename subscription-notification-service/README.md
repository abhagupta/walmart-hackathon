#subscription-notification-service

This app provides sends the notification to the customer using twilio api.

### Entry point:

```
export TWILIO_ACCOUNT_SID=<sid>
export TWILIO_AUTH_TOKEN=<token>
export TWILIO_PHONE_NUMBER=12344053104
export MONGO_URL=<mongo>
export MONGO_URL_TEST=<mongo test url>

node actions/sendNotification.js
```