import type { Module } from '@swc/core';
import { ResolveType } from './resolve';

interface Dependendy {
  source: string;
  type: ResolveType,
}

export function analyzeDeps(ast: Module): Dependendy[] {
  const deps: Dependendy[] = [];

  traverse(ast);

  function traverse(node: any) {
    for (let key in node) {
      if (node[key] && typeof node[key] === 'object') {
        if (Array.isArray(node[key])) {
          node[key].forEach(traverse);
        } else {
          traverse(node[key]);
        }
      }
    }

    if (node.type === 'ImportDeclaration') {
      const source = node.source.value;
      deps.push({ source, type: ResolveType.Import });
    }

    if (node.type === 'CallExpression') {
      if (node.callee.value === 'require' && node.arguments[0]) {
        const source = node.arguments[0].expression.value;
        deps.push({ source, type: ResolveType.Require });
      }

      if (node.callee.value === 'import' && node.arguments[0]) {
        const source = node.arguments[0].expression.value;
        deps.push({ source, type: ResolveType.DynamicImport });
      }
    }
  }

  return deps;
}
