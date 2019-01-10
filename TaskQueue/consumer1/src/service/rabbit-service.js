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

      const q = 'task_queue';
      ch.assertQueue(q, {durable: true});
      ch.prefetch(1);
      ch.consume(q, function(msg) {
        console.log(" [x] Received %s", msg.content.toString());
        setTimeout(function() {
          console.log(" [x] Done");
          ch.ack(msg);
        }, 3000);
      }, {noAck: false});
    });
  });
}
start();

function getService() {
  const s = service;
  return s;
}

module.exports = getService;