/**
 * 根据模块依赖图生成产物
 */
import { Bundler } from '..';

export class Generator {
  bundler: Bundler;

  constructor(bundler: Bundler) {
    this.bundler = bundler;
  }

  generate() {
    console.log('generate start');
  }
}
