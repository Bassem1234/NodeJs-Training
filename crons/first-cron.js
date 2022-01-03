const express = require('express');
const router = express.Router();
const cron = require('node-cron');
const shell = require('shelljs');

cron.schedule("2 * * * * *", function(){
    console.log("Message shown every two minutes: node-cron");
});

module.exports = router;