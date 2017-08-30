'use strict';

const Customer = require('../models/customer');

const notificationWorkerFactory = function() {
  return {
    run: function() {
      Customer.sendNotification("3747");
    },
  };
};





module.exports = notificationWorkerFactory();
