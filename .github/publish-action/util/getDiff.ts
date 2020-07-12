// import {getInput} from '@actions/core' ;
// import {getOctokit} from '@actions/github';
// const token = getInput('GITHUB_TOKEN', {required: true});
// const octokit = getOctokit(token);

import command from './command';

export const process = async (path?:string) => {
	const {stdout, stderr} = await command('git', ['diff', 'e1a329d214', '--name-only'], path);
	console.log('stdout :\n',stdout);
	console.log('stderr :\n',stderr);
}

process();
