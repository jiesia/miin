export interface IConfig {
  entry: string; // index.html
  output: string; // dist
  root: string;
}


export class Config implements IConfig {
  entry: string;
  output: string;
  root: string;

  constructor(config: IConfig) {
    this.entry = config.entry;
    this.output = config.output;
    this.root = config.root;
  }
}
