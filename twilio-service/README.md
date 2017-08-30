# twilio-service

This service is just to close in the loop of twilio message.

## API
` POST /sms` - This is called by Twilio to perform a business logic when a customer sends a reply to the notification.

The request from Twilio gives us a `From` number which is used to retrieve the notification that was used initially.
