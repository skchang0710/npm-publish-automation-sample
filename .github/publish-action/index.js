import * as core from '@actions/core';
import * as github from '@actions/github';
import getDiff from './util/getDiff';

async function run() {
	// const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

	const token = core.getInput('github-token', {required: true});
	const octokit = github.getOctokit(token);

	const path = core.getInput('package-path');
	console.log('path :', path);
	const context = github.context;
	console.log('context :', context);
	
	const {stdout, stderr} = await getDiff(context, path);
	console.log('stdout :\n',stdout);
	console.log('stderr :\n',stderr);
}

try {
	run();
} catch (error) {
	core.setFailed(error.message);
}
