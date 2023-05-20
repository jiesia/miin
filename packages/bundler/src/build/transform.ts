import { ModuleType } from '@mini/core';
import { ILoadResult } from './load';
import { transformSync } from '@swc/core';

type ITransformParam = ILoadResult;

export function transform(transformParam: ITransformParam) {
  const { content, moduleType } = transformParam;

  if (moduleType === ModuleType.Js || moduleType === ModuleType.Jsx) {
    return transformSync(content, {
      jsc: {
        parser: {
          syntax: 'ecmascript',
          jsx: moduleType === ModuleType.Js,
        }
      },
    });
  }

  if (moduleType === ModuleType.Ts || moduleType === ModuleType.Tsx) {
    return transformSync(content, {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: moduleType === ModuleType.Tsx,
          decorators: true,
        }
      }
    });
  }

  throw new Error(`not support module ${moduleType} to parse`);
}
