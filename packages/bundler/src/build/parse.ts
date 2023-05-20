import { ModuleType } from '@mini/core';
import { parseSync } from '@swc/core';
import { ILoadResult } from './load';

type IParseParam = ILoadResult;

export function parse(parseParam: IParseParam) {
  const { content, moduleType } = parseParam;

  if (moduleType === ModuleType.Js || moduleType === ModuleType.Jsx) {
    return parseSync(content, {
      syntax: 'ecmascript',
      comments: false,
      target: 'es2015',
      jsx: moduleType === ModuleType.Jsx,
    });
  }

  if (moduleType === ModuleType.Ts || moduleType === ModuleType.Tsx) {
    return parseSync(content, {
      syntax: 'typescript',
      comments: false,
      target: 'es2015',
      decorators: true,
      tsx: moduleType === ModuleType.Tsx,
    });
  }

  throw new Error('not support module to parse');
}
