import { createHash, randomBytes, pbkdf2Sync } from 'crypto';

export class Conceal {
	static hash(secret) {
		// bytes as salt: minimum random bytes should be 16 for pbkdf2Sync salt to work
		let salted = '';

		randomBytes(16, (err, salt) => {
			if (err) {
				throw err;
			}

			salted += salt;
		});

		// return hash
		return pbkdf2Sync(secret, salted, 10000, 64, 'sha512').toString('hex');
	}

	static compareSync(oldHash, rawPassword) {
		return oldHash === Conceal.hash(rawPassword) ? true : false;
	}

	static createGravatar(uniqueIdentifier, size) {
		if (!size) {
			size = 200;
		}
		// algorithm: md5
		const hash = createHash('md5').update(uniqueIdentifier).digest('hex');

		return 'https://gravatar.com/avatar/' + hash + '?s=' + size + '&d=retro';
	}
}