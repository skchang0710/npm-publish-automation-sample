import { spawn } from 'child_process';

export function getVersion(path:string): { major:string, minor:string, patch:string, beta?:string } {
	const data = require('fs').readFileSync(`${path}/package.json`, 'utf8');
	const packageObj = JSON.parse(data);
	const version = packageObj.version.split('-');
	const main = version[0].split('.');
	const major = main[0];
	const minor = main[1];
	const patch = main[2];
	const beta = (version[1])? version[1].split('.')[1] : undefined;
	return { major, minor, patch, beta };
}

export async function getDiff(base:string, head:string, path:string, ref:string): Promise<{stdout:string, stderr:string}> {
	await command('git', ['fetch', '--no-tags', '--no-recurse-submodules', '--depth=10000', 'origin', ref]);
	return command('git', ['diff', base, head, '--name-only', '--', path]);
}

export function command(cmd:string, args?:string[], cwd?:string): Promise<{stdout:string, stderr:string}> {
  return new Promise((resolve, reject) => {
    const command = spawn(cmd, args, {cwd});
    let stdout       = '';
    let stderr       = '';

    command.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    command.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    command.on('error', (err) => {
      reject(err);
    });

    command.on('close', () => {
      resolve({stdout, stderr});
    });
  });
}
