/* tslint:disable */
import * as fs from 'fs';

export class JavascriptProcessorService {
    static process(
        value: string,
        filename: string,
        context = 'js'
    ): string {
        console.log('JavascriptProcessorService.process() ', value);

        const contexts = {
            'js': 'client',
            'node': 'server'
        };
        const currentContext = contexts[context];
        const rootDirectory = '/nodebook';
        const relativeSourceDirectory = rootDirectory + '/src/';
        const relativeDirectory = relativeSourceDirectory + (currentContext ? currentContext + '/' : '');
        const absoluteSourceDirectory = '/' + relativeSourceDirectory;
        const absoluteDirectory = '/' + relativeDirectory;

        if (!fs.existsSync(process.cwd() + rootDirectory)) {
            fs.mkdirSync(process.cwd() + rootDirectory);
        }

        if (!fs.existsSync(process.cwd() + absoluteSourceDirectory)) {
            fs.mkdirSync(process.cwd() + absoluteSourceDirectory);
        }

        if (!fs.existsSync(process.cwd() + absoluteDirectory)) {
            fs.mkdirSync(process.cwd() + absoluteDirectory);
        }

        fs.writeFileSync(
            process.cwd() + absoluteDirectory + filename + '.js',
            value,
            {encoding: 'utf-8'}
        );

        try {
            const out = (new Function(`
                const ConsoleOutputService = require('../injects/console-output.service.js');
                const consoleOutputService = new ConsoleOutputService();
                consoleOutputService.hook();
                
                require('../${relativeDirectory}${filename}.js');  
                delete require.cache[require.resolve('../${relativeDirectory}${filename}.js')];  
                
                const output = consoleOutputService.expose();
                consoleOutputService.unhook();
                return output;                        
                `))();

            return out;
        } catch(e) {
            console.error(e);
            return e.toString();
        }
    }
}
/* tslint:enable */