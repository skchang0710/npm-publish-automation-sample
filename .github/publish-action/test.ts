import { command, getDiff, updateVersionPatch, updateVersionMinor, updateVersionProduction, buildAndPublish } from './utils';

async function run_command() {
	let result = await command('git', ['diff', 'd03036e68b41b5887937fed44d0ef776146d6732', '--name-only', '--', '../../packages/core']);
	console.log('stdout :\n',result.stdout);
	console.log('stderr :\n',result.stderr);

	result = await command('git', ['diff', 'd03036e68b41b5887937fed44d0ef776146d6732', '--name-only', '--', 'packages/core'], '/Users/quincychang/Documents/Works/npm-publish-automation-sample');
	console.log('stdout :\n',result.stdout);
	console.log('stderr :\n',result.stderr);

	result = await command('git', ['diff', 'd03036e68b41b5887937fed44d0ef776146d6732', '--name-only', '--', 'packages/core'], '../..');
	console.log('stdout :\n',result.stdout);
	console.log('stderr :\n',result.stderr);
}

async function run_get_diff() {
	let result = await getDiff('d03036e68b41b5887937fed44d0ef776146d6732', 'head', '../../packages/core', 'ref/heads/beta');
	console.log('stdout :\n',result.stdout);
	console.log('stderr :\n',result.stderr);
}

async function run_read_files() {
	const files = require('fs').readdirSync('../../packages');
	console.log(files);
}

function run_read_package() {
	let version = updateVersionPatch('../../packages/core');
	console.log(version);
	version = updateVersionMinor('../../packages/core');
	console.log(version);
	version = updateVersionProduction('../../packages/core');
	console.log(version);
}

async function run_build() {
	await buildAndPublish('../../packages/core');
}

