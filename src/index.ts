import app from './app';

const PORT: number = Number(process.env.PORT) || 5000;

const main = async () => {
	const server = app.listen(PORT, () => {
		console.log(`Listening on port ${PORT}`);
	});
};

main();
