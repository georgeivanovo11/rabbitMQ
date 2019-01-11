const getService = require('./../service/rabbit-service');

class Controller {

  send(req, res) {
    let key = req.params.key || "standart message";
    const message = "New message!"
    const rabbit = getService();

    const exchange = 'logs';
    rabbit.assertExchange(exchange, 'topic', {durable: false});
    rabbit.publish(exchange, key, Buffer.from(message));
    console.log(`[x] Sent '${message}' to ${key}`);

    res.status(200).send({status: "success"});
  }

}

module.exports = new Controller();

// speed.size