import * as core from '@actions/core';
import * as github from '@actions/github';
import { getDiff, getVersion } from './utils';

async function checkAndPublish(context, path) {
	console.log(`[ ${path} ] start process`);

	let base;
	let head;
	if (context.payload.pull_request) {
		base = context.payload.pull_request.base;
		head = context.payload.pull_request.head;
	} else {
		base = context.payload.before;
		head = context.payload.after;
	}

	const { stdout, stderr } = await getDiff(base, head, path, context.ref);

	if (stdout) {
		console.log('getDiff output :');
		console.log(stdout);

	} else if (stderr) {
		console.log('getDiff error :');
		console.log(stderr);
		return;

	} else {
		console.log('not modified !');
		return;
	}

	const version = getVersion(path);
	console.log('getVersion :', version);

	const ref = context.ref.split('/')[2];
	if (ref === 'master') {
	} else if (ref.startsWith('stg')) {
	} else if (ref.startsWith('hotfix')) {
	} else if (ref === 'beta') {
	}

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
