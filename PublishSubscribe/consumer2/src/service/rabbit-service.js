var amqp = require('amqplib/callback_api');


function start() {
  amqp.connect("amqp://user:bitnami@rabbitmq:5672/", function(err, conn) {
    if (err) {
      console.error("[AMQP]", err.message);
      return setTimeout(start, 2000);
    }
    console.log("[AMQP] connected");
    conn.createChannel(function(err, ch) {
      console.log("Channel connected");

      const exchange = 'logs';
      ch.assertExchange(exchange, 'fanout', {durable: false});

      ch.assertQueue('', {exclusive: true}, function(err, res) {
        console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", res.queue);
        ch.bindQueue(res.queue, exchange, '');

        ch.consume(res.queue, function(msg) {
            console.log(" [x] Received: %s", msg.content.toString());
        }, {noAck: true});
      });

    });
  });
}
start();