var amqp = require("amqplib/callback_api");

const key = "*.comment";
async function send(post_id) {
  return new Promise((resolve, reject) => {
    amqp.connect(process.env.AMQP_URL, function (error0, connection) {
      if (error0) {
        throw error0;
      }
      return connection.createChannel(function (error1, channel) {
        if (error1) {
          throw error1;
        }
        channel.assertQueue(
          "",
          {
            exclusive: true,
          },
          function (error2, q) {
            if (error2) {
              throw error2;
            }
            var correlationId = generateUuid();

            console.log(" [x] Requesting post with id(%d)", post_id);

            channel.sendToQueue("rpc_queue", Buffer.from(post_id.toString()), {
              correlationId: correlationId,
              replyTo: q.queue,
            });
            channel.consume(
              q.queue,
              function (msg) {
                var message = JSON.parse(msg.content);
                if (msg.properties.correlationId == correlationId) {
                  var message = JSON.parse(msg.content);
                  if (!message) {
                    reject("Unauthorized access to the user data");
                  }
                  resolve({
                  });
                  console.log(message);
                  setTimeout(function () {
                    connection.close();
                  }, 500);
                }
              },
              {
                noAck: true,
              }
            );
          }
        );
      });
    });
  });
}

function generateUuid() {
  return (
    Math.random().toString() +
    Math.random().toString() +
    Math.random().toString()
  );
}


module.exports = { send };
