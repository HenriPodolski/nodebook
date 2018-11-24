/* tslint:disable */
import { SourceFilesService } from '../files/source-files.service';
import { ISourceFileInfos } from '../../shared/interfaces/source-file.interface';
import { IProcessOutput } from '../../shared/interfaces/output.interface';

export class StylesheetProcessorService {
	static process({value, filename, mode, context}): IProcessOutput {

		const sourceFileInfos: ISourceFileInfos = SourceFilesService
			.createIfNotExists(value, filename, mode, context);

		return {out: [], file: sourceFileInfos.relativeFilePath, infos: sourceFileInfos};
	}
}
/* tslint:enable */