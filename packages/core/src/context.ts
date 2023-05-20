import { Config } from "./config";

export class Context {
  config: Config;

  constructor(config: Config) {
    this.config = config;
  }
}
