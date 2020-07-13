import * as core from '@actions/core';
import * as github from '@actions/github';
import getDiff from './util/getDiff';

async function run() {
	// const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

	const token = core.getInput('github-token', {required: true});
	const octokit = github.getOctokit(token);

	const context = github.context;
	console.log('context :', context);
	
	console.log('getDiff core');
	let result = await getDiff(context, 'packages/core');
	console.log('stdout :\n',result.stdout);
	console.log('stderr :\n',result.stderr);

	console.log('getDiff btc');
	result = await getDiff(context, 'packages/cws-btc');
	console.log('stdout :\n',result.stdout);
	console.log('stderr :\n',result.stderr);
}

try {
	run();
} catch (error) {
	core.setFailed(error.message);
}
