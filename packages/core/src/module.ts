import { Module as AST } from "@swc/core";

export enum ModuleType {
  Js,
  Jsx,
  Ts,
  Tsx,
  Css,
  Less,
  Sass,
  Html,
  Assets,
  NotSupport,
}

interface IModule {
  path: string;
  type: ModuleType;
  ast: AST;
}

export class Module implements IModule {
  path: string;
  type: ModuleType;
  ast: AST;

  constructor(module: Module) {
    this.path = module.path;
    this.type = module.type;
    this.ast = module.ast;
  }
}
