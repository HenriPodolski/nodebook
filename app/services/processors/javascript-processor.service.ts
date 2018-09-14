/* tslint:disable */
import * as fs from 'fs';

export class JavascriptProcessorService {
    static process(value: string, filename: string): string {
        console.log('JavascriptProcessorService.process() ', value);

        fs.writeFileSync(process.cwd() + '/app/nodebook/' + filename + '.js', value, {encoding: 'utf-8'});

        try {
            return (new Function(`
                require('./nodebook/${filename}.js');   
                delete require.cache[require.resolve('./nodebook/${filename}.js')];                                   
                `))();
        } catch(e) {
            console.error(e);
            return e.toString();
        }
    }
}
/* tslint:enable */