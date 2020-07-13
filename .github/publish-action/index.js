import * as core from '@actions/core';
import * as github from '@actions/github';
import { getDiff, getVersion } from './utils';

async function checkAndPublish(context, path) {
	console.log(`getDiff: ${path}`);
	let base;
	let head;
	if (context.payload.pull_request) {
		base = context.payload.pull_request.base;
		head = context.payload.pull_request.head;
	} else {
		base = context.payload.before;
		head = context.payload.after;
	}
	let result = await getDiff(base, head, context.ref, path);
	console.log('stdout :\n',result.stdout);
	console.log('stderr :\n',result.stderr);

	if (!result.stdout) return;

}

async function run() {
	// const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

	const token = core.getInput('github-token', {required: true});
	const octokit = github.getOctokit(token);

	const context = github.context;
	console.log('context :', context);
	
	await checkAndPublish(context, 'packages/core');
	await checkAndPublish(context, 'packages/cws-btc');
}

try {
	run();
} catch (error) {
	core.setFailed(error.message);
}
