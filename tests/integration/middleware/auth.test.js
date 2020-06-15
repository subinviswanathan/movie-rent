const request = require('supertest');
const { User } = require('../../../models/user');
const { Genre } = require('../../../models/genre');
let server;

describe('auth middleware', () => {
	let token;
	let name;
	beforeEach(() => {
		server = require('../../../index');
		token = new User().generateAuthToken();
		name = 'genre1';
	});

	afterEach(async () => {
		await server.close();
		await Genre.remove({});
	});
	const exec = () =>
		request(server)
			.post('/api/genres')
			.set('x-auth-token', token)
			.send({ name });

	it('should return 401 if no token is provided', async () => {
		token = '';

		const res = await exec();

		expect(res.status).toBe(401);
	});

	it('should return 400 if no token is invalid', async () => {
		token = 'a';

		const res = await exec();

		expect(res.status).toBe(400);
	});

	it('should return 200 if token is valid', async () => {
		const res = await exec();

		expect(res.status).toBe(200);
	});
});
