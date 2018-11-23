/* tslint:disable */
import { SourceFilesService } from '../files/source-files.service';
import { ISourceFileInfos } from '../../shared/interfaces/source-file.interface';
import { IProcessOutput } from '../../shared/interfaces/output.interface';

export class JavascriptServerProcessorService {
    static process({value, filename, mode, context}): IProcessOutput {

        console.log('JavascriptServerProcessorService.process()', value, filename, mode, context);

        const sourceFileInfos: ISourceFileInfos = SourceFilesService
            .createIfNotExists(value, filename, mode, context);
        let out;
        const originalConsole = console;

		console.log('JavascriptServerProcessorService.process() sourceFileInfos', JSON.stringify(sourceFileInfos, null, 4));

        try {
            out = (new Function(`
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