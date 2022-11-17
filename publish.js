const amqp = require('amqplib');

const queue = 'GATOS';

(async () => {
	const connection = await amqp.connect(process.env.URL_QMQP);
	const chanel = await connection.createChannel();

	chanel.assertQueue(queue, {
		durable: true,
	});

	const msg = {
		nombre: 'Irino',
		edad: '8 meses',
	};

	const sent = chanel.sendToQueue(queue, Buffer.from(JSON.stringify(msg)));
	console.log(`isSent ${sent}`);
	console.log(`[X] sent ${msg} to queue ${queue} `);
})();
