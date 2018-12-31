export interface IPackages {
  dependencies: {[key: string]: string};
  devDependencies: {[key: string]: string};
  configure: boolean;
}