import { JavascriptProcessorService } from './javascript-processor.service';
import { IInput } from '../../shared/interfaces/input.interface';
import { TypescriptProcessorService } from './typescript-processor.service';

export const process = (inputObject: IInput): string => {
    switch (inputObject.mode) {
        case ('javascript'): {
            return JavascriptProcessorService.process(
                inputObject.value, inputObject.name
            );
        }

        case ('typescript'): {
            return TypescriptProcessorService.process(
                inputObject.value, inputObject.name
            );
        }
    }

    return '';

};