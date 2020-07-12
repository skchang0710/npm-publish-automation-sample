import { spawn } from 'child_process';

export default function (cmd:string, args?:string[], cwd?:string): Promise<{stdout:string, stderr:string}> {
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
