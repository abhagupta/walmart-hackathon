#subscription_service

This is the main service layer which provides API for retrieving subscriptions, customer, notifications.

 ## API:
  `GET /api/subscriptions` - retrieves all the customer subscriptions. `customerId` is sent in req.query
  `POST /api/subscriptions` - adds new subscriptions once customer has accepted
  `GET /api/customerInfo` - gets customer Info based on customerId
  `GET /api/customerInfo/:phoneNumber` - gets customer info for given phone number
  `GET /api/notification` - gets notification
  `POST /api/notification` - posts a new notification