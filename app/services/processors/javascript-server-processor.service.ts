/* tslint:disable */
import { SourceFilesService } from '../files/source-files.service';
import { ISourceFileInfos } from '../../shared/interfaces/source-file.interface';
import { IProcessOutput } from '../../shared/interfaces/output.interface';
import { IRootState } from '../../shared/interfaces/root-state.interface';
import { StateSnapShotService } from '../state/state-snapshot.service';

export class JavascriptServerProcessorService {
    static process({value, id, filename, mode, context}, state: IRootState): IProcessOutput {

        // console.log('JavascriptServerProcessorService.process()', value, filename, mode, context);

        const sourceFileInfos: ISourceFileInfos = SourceFilesService
            .createIfNotExists(value, filename, mode, context);
        let out;
        let data = '{}';
        const originalConsole = console;

        const dataOutputs = StateSnapShotService
            .getAllOutputsBeforeIndexWithSpecifiedModes(state, id, ['json']);

        const dataSources = dataOutputs.reduce((prev, next) => {
            prev += `${next.name}: ${JSON.stringify(JSON.parse(next.value))}`;
            return prev;
        }, '');

        if (dataSources.length) {
            data = `{${dataSources}}`;
            console.log('Data sources applied', data);
        }

        try {
            out = (new Function(`
                const ConsoleOutputService = require('../injects/console-output.service.js');
                const consoleOutputService = new ConsoleOutputService();
                console.log('consoleOutputService', consoleOutputService);
                consoleOutputService.hook();
                
                global.nodebook = {
                    data: ${data}
                };
                
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