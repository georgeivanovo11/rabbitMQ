const uuidv1 = require('uuid/v1');
const getService = require('./../service/rabbit-service');

class Controller {

  send(req, res) {
    let value = req.params.value;
    const rabbit = getService();
    const taskQueue = "task_queue";

    rabbit.assertQueue('', {exclusive: true}, (err,callbackQueue) =>{
      const id = uuidv1();
      rabbit.sendToQueue(taskQueue, Buffer.from(value), {replyTo: callbackQueue.queue, correlationId: id});
      console.log(` [x] The request was send! N=${value}`);
      rabbit.consume(callbackQueue.queue, (msg)=>{
        if (msg.properties.correlationId == id) {
          console.log(` [X] The response was received! N=${msg.content.toString()}`);
          res.status(200).send({status: "success", value: msg.content.toString()});
        }
      });
    }, {noAck: true});
  }

}

module.exports = new Controller();