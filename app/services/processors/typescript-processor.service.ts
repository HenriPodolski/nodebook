
export class TypescriptProcessorService {
    static process(value: string): string {
        try {
            return (new Function(`return ((function() {
                ${value}
            })())`))();
        } catch(e) {
            console.error(e);
            return e.toString();
        }
    }
}