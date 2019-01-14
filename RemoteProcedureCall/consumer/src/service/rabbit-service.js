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
        console.log(` [x] Received: ${msg.content.toString()}`);

        const n = parseInt(msg.content.toString());
        const result = fibonacci(n);
        ch.sendToQueue(msg.properties.replyTo, new Buffer(result.toString()),{correlationId: msg.properties.correlationId});
        console.log(` [x] Send: ${result.toString()}`);
        ch.ack(msg);
      });
    });
  });
}
start();

function fibonacci(n) {
  if (n == 0 || n == 1)
    return n;
  else
    return fibonacci(n - 1) + fibonacci(n - 2);
}

function getService() {
  const s = service;
  return s;
}

module.exports = getService;