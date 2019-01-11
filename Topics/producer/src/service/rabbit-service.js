var amqp = require('amqplib/callback_api');

let service = null;
function start() {
  amqp.connect("amqp://user:bitnami@rabbitmq:5672/", function(err, conn) {
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(start, 2000);
    }
    console.log("[AMQP] connected");
    conn.createChannel(function(err, ch) {
      service = ch;
      console.log("Channel connected");
    });
  });
}
start();

function getService() {
  const s = service;
  return s;
}

module.exports = getService;