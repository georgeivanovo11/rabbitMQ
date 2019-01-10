const getService = require('./../service/rabbit-service');

class Controller {

  send(req, res) {
    const rabbit = getService();

    const q = 'cars';
    rabbit.assertQueue(q, {durable: false});
    rabbit.sendToQueue(q, Buffer.from('Hello World!'));
    console.log(" [x] Sent 'Hello World!'");
    res.send("ok");
  }

}

module.exports = new Controller();