import { JavascriptServerProcessorService } from './javascript-server-processor.service';
import { IInput } from '../../shared/interfaces/input.interface';
import { TypescriptServerProcessorService } from './typescript-server-processor.service';
import { ContextEnums } from '../../enums/contexts.enums';
import { ModeEnums } from '../../enums/mode.enums';
import { JavascriptClientProcessorService } from './javascript-client-processor.service';
import { TypescriptClientProcessorService } from './typescript-client-processor.service';
import { IProcessOutput } from '../../shared/interfaces/output.interface';
import { MarkdownProcessorService } from './markdown-processor.service';
import { StylesheetProcessorService } from './stylesheet-processor.service';
import { HtmlProcessorService } from './html-processor.service';
import { JsonProcessorService } from './json-processor.service';
import { IRootState } from '../../shared/interfaces/root-state.interface';

export class ProcessorService {
  static process(inputObject: IInput, state: IRootState): IProcessOutput {
    const config = {
      id: inputObject.id,
      value: inputObject.value,
      filename: inputObject.name,
      mode: inputObject.mode,
      context: inputObject.context
    };

    let processOutput: IProcessOutput = {out: [], file: ''};

    // console.log('ProcessorService.process()', JSON.stringify(inputObject, null, 4));

    switch (true) {

      case (inputObject.mode === ModeEnums.md.value): {
        processOutput = MarkdownProcessorService.process(config);
        break;
      }

      case (inputObject.mode === ModeEnums.js.value && inputObject.context === ContextEnums.js.client): {
        processOutput = JavascriptClientProcessorService.process(config);
        break;
      }

      case (inputObject.mode === ModeEnums.js.value && inputObject.context === ContextEnums.js.server): {
        processOutput = JavascriptServerProcessorService.process(config, state);
        break;
      }

      case (inputObject.mode === ModeEnums.ts.value && inputObject.context === ContextEnums.ts.client): {
        processOutput = TypescriptClientProcessorService.process(config);
        break;
      }

      case (inputObject.mode === ModeEnums.ts.value && inputObject.context === ContextEnums.ts.server): {
        processOutput = TypescriptServerProcessorService.process(config, state);
        break;
      }

      case (inputObject.mode === ModeEnums.css.value): {
        processOutput = StylesheetProcessorService.process(config);
        break;
      }

      case (inputObject.mode === ModeEnums.html.value): {
        processOutput = HtmlProcessorService.process(config);
        break;
      }

      case (inputObject.mode === ModeEnums.json.value): {
        processOutput = JsonProcessorService.process(config);
        break;
      }
    }

    return processOutput;
  }
}