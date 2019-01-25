import { ReplaySubject } from 'rxjs';

const child_process = require('child_process');
const mockData = require('./npm.mock.json');

export class NpmService {
  static queryNpm(query): Promise<any[]> {
    const mock = false;
    let perform;

    if (mock) {
      perform = new Promise((resolve) => {
        resolve(mockData);
      })
    } else {
      perform = new Promise((resolve, reject) => {
        query = query.replace(/^@/, '');

        if (!query) {
          resolve([]);
        }

        child_process.exec(`npm search --json --no-description ${query}`, (error, stdout) => {
          if (error) {
            reject(error);
            return;
          }

          try {
            const out = JSON.parse(stdout.trim());

            const filteredOut = out.filter(pkg => {
              return pkg.name.includes(query);
            });

            resolve(filteredOut);
          } catch(err) {
            reject(err);
          }
        });
      });
    }

    return perform;
  }

  static checkNpmInstallation(): ReplaySubject<{stderror?: string, stdout?: string}> {
    const perform$: ReplaySubject<any> = new ReplaySubject<any>();

    child_process.exec('npm help', (stderror, stdout) => {
      if (stderror) {
        perform$.next({stderror: stderror});
      }

      if (stdout) {
        perform$.next({stdout: stdout});
      }
    });

    return perform$;
  }

  static uninstallNpmPackage(npmPackage: string,
                             isDev: boolean = false): ReplaySubject<{stderror?: string, stdout?: string}> {
    const perform$: ReplaySubject<any> = new ReplaySubject<any>();
    console.log('uninstallNpmPackage', npmPackage, 'isDev', isDev);

    child_process
        .exec(`npm uninstall --prefix ./nodebook ${npmPackage} ${isDev ? '-D' : '-S'}`,
            (stderror, stdout) => {
              if (stderror) {
                perform$.next({stderror: stderror});
              }

              if (stdout) {
                perform$.next({stdout: stdout});
              }

            });

    return perform$;
  }

  static installNpmPackage(
  	npmPackage: string,
	isDev: boolean = false
  ): ReplaySubject<{stderror?: string, stdout?: string}> {
    const perform$: ReplaySubject<any> = new ReplaySubject<any>();

    child_process
		.exec(`npm install --prefix ./nodebook ${npmPackage} ${isDev ? '-D' : '-S'}`,
		(stderror, stdout) => {
		    if (stderror) {
			  perform$.next({stderror: stderror});
			}

			if (stdout) {
              perform$.next({stdout: stdout});
            }

		});

    return perform$;
  }
}