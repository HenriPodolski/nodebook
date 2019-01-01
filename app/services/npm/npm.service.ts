const child_process = require('child_process');

// check https://docs.npmjs.com/cli/search.html for docs
// on how to use it
export const queryNpm = (query) => {
  console.log('queryNpm', query);
  child_process.exec(`npm search --json ${query}`, (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
};

