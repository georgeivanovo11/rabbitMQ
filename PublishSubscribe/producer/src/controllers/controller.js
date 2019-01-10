const getService = require('./../service/rabbit-service');

class Controller {

  send(req, res) {
    let message = req.params.message || "standart message";
    const rabbit = getService();

    const exchange = 'logs';
    rabbit.assertExchange(exchange, 'fanout', {durable: false});
    rabbit.publish(exchange, '', Buffer.from(message));
    console.log(`[x] Sent '${message}'`);

    res.status(200).send({status: "success"});
  }

}

module.exports = new Controller();