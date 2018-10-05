/* tslint:disable */
import { SourceFilesService } from '../files/source-files.service';
import { ISourceFileInfos } from '../../shared/interfaces/source-file.interface';
import { IProcessOutput } from '../../shared/interfaces/output.interface';

export class JavascriptServerProcessorService {
    static process({value, filename, mode, context}): IProcessOutput {

        const sourceFileInfos: ISourceFileInfos = SourceFilesService
            .createIfNotExists(value, filename, mode, context);
        let out;

        try {
            out = (new Function(`
                const ConsoleOutputService = require('../injects/console-output.service.js');
                const consoleOutputService = new ConsoleOutputService();
                consoleOutputService.hook();
                
                require('${sourceFileInfos.relativeFilePath}');  
                delete require.cache[require.resolve('${sourceFileInfos.relativeFilePath}')];  
                
                const output = consoleOutputService.expose();
                consoleOutputService.unhook();
                return output;                        
                `))();
        } catch(e) {
            console.error(e);
            return e.toString();
        }

        return {out, file: sourceFileInfos.relativeFilePath, infos: sourceFileInfos};
    }
}
/* tslint:enable */