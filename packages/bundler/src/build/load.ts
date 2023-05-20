import { readFileSync } from 'fs';
import { extname } from 'path';
import { ModuleType } from '@mini/core';

export interface ILoadResult {
  content: string;
  moduleType: ModuleType;
}

/**
 * 获取模块内容以及模块类型
 * @param path 模块绝对路径
 */
export function load(path: string): ILoadResult {
  const content = readFileSync(path).toString();
  const moduleType = pathTypeMap[extname(path).slice(1) as keyof typeof pathTypeMap] ?? ModuleType.NotSupport;

  return { content, moduleType };
}


const pathTypeMap = {
  'js': ModuleType.Js,
  'ts': ModuleType.Ts,
  'jsx': ModuleType.Jsx,
  'tsx': ModuleType.Tsx,
  'css': ModuleType.Css,
  'html': ModuleType.Html,
};
