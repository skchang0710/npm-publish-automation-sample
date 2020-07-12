import { Context } from '@actions/github/lib/context';
import command from './command';

export default async function(context:Context, path?:string): Promise<{stdout:string, stderr:string}> {
	let base;
	let head;
	if (context.payload.pull_request) {
		base = context.payload.pull_request.base;
		head = context.payload.pull_request.head;
	} else {
		base: context.payload.before;
		head: context.payload.after;
	}
	return command('git', ['diff', base, head, '--name-only'], path);
}
