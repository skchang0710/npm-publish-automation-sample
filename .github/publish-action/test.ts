import command from './util/command';

async function run() {
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

run();
