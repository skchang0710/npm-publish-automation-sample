import * as core from '@actions/core';
import * as github from '@actions/github';
import getDiff from './util/getDiff';

try {
	// const payload = JSON.stringify(github.context.payload, undefined, 2)
  // console.log(`The event payload: ${payload}`);

	const token = core.getInput('github-token', {required: true});
	const octokit = github.getOctokit(token);

	const path = core.getInput('package-path');
	console.log('path :', path);
	const context = github.context;
	
	const {stdout, stderr} = await getDiff(context);
	console.log('stdout :\n',stdout);
	console.log('stderr :\n',stderr);

} catch (error) {
	core.setFailed(error.message);
}
