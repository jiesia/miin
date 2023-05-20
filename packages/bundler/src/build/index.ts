/**
 * 生成一个模块依赖图
 */

import { Bundler } from '..';
import { analyzeDeps } from './analyzeDeps';
import { load } from './load';
import { parse } from './parse';
import { resolve, ResolveType, IResolveParam } from './resolve';
import { transform } from './transform';


export class Builder {
  bundler: Bundler;

  constructor(bundler: Bundler) {
    this.bundler = bundler;
  }

  build() {
    let entry = this.bundler.context.config.entry;
    this.buildModuleGraph({
      source: entry, // 'index.html'
      type: ResolveType.Entry, // Entry
      parent: null,
    });
  }

  // 生成模块依赖图, 递归
  buildModuleGraph(resolveParam: IResolveParam) {
    // resolve ./App -> PATH/TO/App react -> node_modules/react
    const path = resolve(resolveParam, this.bundler.context);
    console.log(`> build ${path}`);

    // load 读取文件内容, fs utf8 string
    const loadResult = load(path);

    // transform 把模块转换为浏览器可以识别的类型
    const transformResult = transform(loadResult);

    // parse 把文件内容解析为 AST
    const ast = parse({
      content: transformResult.code,
      moduleType: loadResult.moduleType
    });

    // analyze deps
    const deps = analyzeDeps(ast);
    console.log(`> analyzeDeps ${JSON.stringify(deps, null, 2)}`);

    deps.forEach(dep => {
      this.buildModuleGraph({
        source: dep.source,
        type: dep.type,
        parent: path,
      });
    });
  }
}
