/**
 * 生成一个模块依赖图
 */

import { Bundler } from '..';

export class Builder {
  bundler: Bundler;

  constructor(bundler: Bundler) {
    this.bundler = bundler;
  }

  build() {
    console.log('build start');
  }
}
