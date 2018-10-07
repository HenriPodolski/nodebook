import { JavascriptServerProcessorService } from './javascript-server-processor.service';
import { IInput } from '../../shared/interfaces/input.interface';
import { TypescriptServerProcessorService } from './typescript-server-processor.service';
import { ContextEnums } from '../../enums/contexts.enums';
import { ModeEnums } from '../../enums/mode.enums';
import { JavascriptClientProcessorService } from './javascript-client-processor.service';
import { TypescriptClientProcessorService } from './typescript-client-processor.service';
import { IProcessOutput } from '../../shared/interfaces/output.interface';

export class ProcessorService {
	static process(inputObject: IInput): IProcessOutput {
		const config = {
			value: inputObject.value,
			filename: inputObject.name,
			mode: inputObject.mode,
			context: inputObject.context
		};

		let processOutput: IProcessOutput = {out: [], file: ''};

		switch (true) {
			case (inputObject.mode === ModeEnums.js.value && inputObject.context === ContextEnums.js.client): {
				processOutput = JavascriptClientProcessorService.process(config);
				break;
			}

			case (inputObject.mode === ModeEnums.js.value && inputObject.context === ContextEnums.js.server): {
				processOutput = JavascriptServerProcessorService.process(config);
				break;
			}

			case (inputObject.mode === ModeEnums.ts.value && inputObject.context === ContextEnums.ts.client): {
				processOutput = TypescriptClientProcessorService.process(config);
				break;
			}

			case (inputObject.mode === ModeEnums.ts.value && inputObject.context === ContextEnums.ts.server): {
				processOutput = TypescriptServerProcessorService.process(config);
				break;
			}
		}

		return processOutput;
    }
}