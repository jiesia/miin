import { Bundler } from '@mini/bundler';
import { Config, IConfig } from '@mini/core';
import { join } from 'path';

const args = process.argv.slice(2);
const cwd = process.cwd(); // current workspace directory
const userConfig: Partial<IConfig> = require(join(cwd, 'mini.config.json'));

if (args[0] === 'build') {
  const config = new Config({
    entry: userConfig.entry ?? 'index.html',
    output: userConfig.output ?? 'dist',
    root: cwd,
  });

  new Bundler(config).bundle();
}
