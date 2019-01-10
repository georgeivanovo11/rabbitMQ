const getService = require('./../service/rabbit-service');

class Controller {

  send(req, res) {
    let message = req.params.message || "standart message";
    const rabbit = getService();
    const queue = 'task_queue';
    rabbit.assertQueue(queue, {durable: true});
    rabbit.sendToQueue(queue, Buffer.from(message), {persistent: true});
    console.log(`[x] Sent '${message}'`);
    res.status(200).send({status: "success"});
  }

}

module.exports = new Controller();