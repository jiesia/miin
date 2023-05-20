import { Context } from '@mini/core';
import path from 'path';

export interface IResolveParam {
  source: string; // './App'
  parent: string | null, // 父模块的绝对路径
  type: ResolveType,
}

export enum ResolveType {
  Entry, // index.html
  Import, // import a from './a';
  Require, // require('./a');
  DynamicImport, // import('./a');
  ScriptSrc, // <script src="index.tsx"/>
}

// js json node  ts tsx jsx
require.extensions['.ts'] = require.extensions['.tsx'] = require.extensions['.jsx'] = function (module, filename) {
  const fs = require('fs');
  const content = fs.readFileSync(filename, 'utf8');
  module.exports = content;
};

export function resolve(resolveParam: IResolveParam, context: Context): string {
  const { root } = context.config;
  const { source, parent, type } = resolveParam;

  if (type == ResolveType.Entry) {
    // root + source
    return path.resolve(root, source);
  }
  return require.resolve(source, { paths: [path.dirname(parent!)] });
}
