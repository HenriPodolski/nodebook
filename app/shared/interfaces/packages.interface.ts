export interface IPackages {
  dependencies: {[key: string]: string};
  devDependencies: {[key: string]: string};
  configure: boolean;
}

export interface IPackagesAutocomplete {
  query: string;
  selected: {name: string, [key: string]: string} | null;
  found: {name: string, [key: string]: string}[];
}