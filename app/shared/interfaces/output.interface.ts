import { ISourceFileInfos } from './source-file.interface';

export interface IProcessOutput {
	out: any[];
	file: string;
	infos?: ISourceFileInfos;
}