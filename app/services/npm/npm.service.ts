const child_process = require('child_process');
const mockData = require('./npm.mock.json');

// check https://docs.npmjs.com/cli/search.html for docs
// on how to use it
export const queryNpm = (query): Promise<any[]> => {
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
};

export const installNpmPackage = (npmPackage: string, isDev: boolean = false): Promise<any[]> => {
  let perform;

  if (isDev) {
    perform = new Promise((resolve, reject) => {});
  } else {
    perform = new Promise((resolve, reject) => {});
  }

  return perform;
};