import { Config, Context } from '@mini/core';
import { Builder } from './build';
import { Generator } from './generate';

export class Bundler {
  context: Context;

  constructor(config: Config) {
    this.context = new Context(config);
  }

  bundle() {
    new Builder(this).build();
    new Generator(this).generate();
  }
}
