
export class TypescriptProcessorService {
    static process(value: string): string {
        return (new Function(`return ${value}`))();
    }
}