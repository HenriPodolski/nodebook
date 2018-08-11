/* tslint:disable */
import * as fs from 'fs';

export class JavascriptProcessorService {
    static process(value: string): string {
        console.log('JavascriptProcessorService.process() ', value);
        console.group('JavascriptProcessorService.process() todo');
        console.log(process.cwd());
        console.log('Write value to file before execution');
        console.groupEnd();

        fs.writeFileSync(process.cwd() + '/app/nodebook/index.js', value, {encoding: 'utf-8'});

        try {
            return (new Function(`
                require('./nodebook/index.js');   
                delete require.cache[require.resolve('./nodebook/index.js')];                                   
                `))();
        } catch(e) {
            console.error(e);
            return e.toString();
        }
    }
}
/* tslint:enable */