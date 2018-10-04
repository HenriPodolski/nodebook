import { JavascriptServerProcessorService } from './javascript-server-processor.service';
import { IInput } from '../../shared/interfaces/input.interface';
import { TypescriptServerProcessorService } from './typescript-server-processor.service';
import { ContextEnums } from '../../enums/contexts.enums';
import { ModeEnums } from '../../enums/mode.enums';
import { JavascriptClientProcessorService } from './javascript-client-processor.service';
import { TypescriptClientProcessorService } from './typescript-client-processor.service';
import { IProcessOutput } from '../../shared/interfaces/output.interface';

export const process = (inputObject: IInput): IProcessOutput => {

    const config = {
		value: inputObject.value,
		filename: inputObject.name,
		mode: inputObject.mode,
		context: inputObject.context
	};

    switch (true) {
        case (inputObject.mode === ModeEnums.js.value && inputObject.context === ContextEnums.js.client): {
            return JavascriptClientProcessorService.process(config);
        }

		case (inputObject.mode === ModeEnums.js.value && inputObject.context === ContextEnums.js.server): {
			return JavascriptServerProcessorService.process(config);
		}

		case (inputObject.mode === ModeEnums.ts.value && inputObject.context === ContextEnums.ts.client): {
			return TypescriptClientProcessorService.process(config);
		}

		case (inputObject.mode === ModeEnums.ts.value && inputObject.context === ContextEnums.ts.server): {
			return TypescriptServerProcessorService.process(config);
		}
    }

    return {out: [], file: ''};
};