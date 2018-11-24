/* tslint:disable */
import { ISourceFileInfos } from '../../shared/interfaces/source-file.interface';
import { SourceFilesService } from '../files/source-files.service';
import { IProcessOutput } from '../../shared/interfaces/output.interface';

const compilerOptions = {
/* Basic Options */
    "target": "es5",                          /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017','ES2018' or 'ESNEXT'. */
    "module": "commonjs",                     /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */
    "lib": [
        "dom",
        "ES2015",
        "ES2016",
        "ES2017",
        "ES2018"
    ],                                        /* Specify library files to be included in the compilation. */
    // "allowJs": true,                       /* Allow javascript files to be compiled. */
    // "checkJs": true,                       /* Report errors in .js files. */
    "jsx": "react",                           /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. */
    "declaration": true,                      /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    "outDir": "./",                           /* Redirect output structure to the directory. */
    "rootDir": "./",                          /* Specify the root directory of input files. Use to control the output directory structure with --outDir. */
    // "composite": true,                     /* Enable project compilation */
    // "removeComments": true,                /* Do not emit comments to output. */
    // "noEmit": true,                        /* Do not emit outputs. */
    "importHelpers": true,                 /* Import emit helpers from 'tslib'. */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). */

    /* Strict Type-Checking Options */
    "strict": true,                           /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                    /* Raise error on expressions and declarations with an implied 'any' type. */
    "strictNullChecks": true,                 /* Enable strict null checks. */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    "typeRoots": ["node_modules/@types"],                       /* List of folders to include type definitions from. */
    "types": ["node"],                           /* Type declaration files to be included in compilation. */
    "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true,                   /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */

    /* Source Map Options */
    // "sourceRoot": "./",                    /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "./",                       /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. */
    "emitDecoratorMetadata": true        /* Enables experimental support for emitting type metadata for decorators. */
};

export class TypescriptServerProcessorService {
	static process({value, filename, mode, context}): IProcessOutput {
		const sourceFileInfos: ISourceFileInfos = SourceFilesService
			.createIfNotExists(value, filename, mode, context);
		let out;
		const originalConsole = console;

        try {
            out = (new Function(`  
                const tsNode = require('ts-node');
                
                tsNode.register({
                    project: false,
                    compilerOptions: ${JSON.stringify(compilerOptions)},
                    cache: false,
                    typeCheck: true,
                    ignoreWarnings: false
                });
                
                const ConsoleOutputService = require('../injects/console-output.service.js');
                const consoleOutputService = new ConsoleOutputService();
                console.log('consoleOutputService', consoleOutputService);
                consoleOutputService.hook();
                
                require('.${sourceFileInfos.relativeFilePath}');   
                delete require.cache[require.resolve('.${sourceFileInfos.relativeFilePath}')];                              
                const output = consoleOutputService.expose();
                consoleOutputService.unhook();
                return output; 
            `))();
        } catch(e) {
			// Asure console unhook
			console = originalConsole;
            console.error(e);
            return e.toString();
        }

		return {out, file: sourceFileInfos.relativeFilePath, infos: sourceFileInfos};
    }
}
/* tslint:enable */