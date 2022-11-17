const amqp = require('amqplib');

const queue = 'GATOS';

(async () => {
	const connection = await amqp.connect(process.env.URL_QMQP);
	const chanel = await connection.createChannel();

	chanel.assertQueue(queue, {
		durable: true,
	});

	chanel.consume(
		queue,
		(msg) => {
			const data = JSON.parse(msg.content.toString());
			console.log(data.nombre);
		},
		{
			noAck: true,
		}
	);
})();
