import * as fs from 'fs';
import { environment } from '../../environments/environment';
import { ISourceFileInfos } from '../../shared/interfaces/source-file.interface';

export interface IFileInfoParameters {
	value: string;
	name: string;
	mode: string;
	context: string;
}

export class SourceFilesService {

	static getFileInfos({value, name, mode, context}: IFileInfoParameters): ISourceFileInfos {
		const rootDirectory = '/nodebook';
		const relativeSourceDirectory = rootDirectory + '/src/';
		const absoluteSourceDirectory = '/' + relativeSourceDirectory;
		const nodebookContextDirectory = relativeSourceDirectory + (context ? context + '/' : '');
		const modeObject = environment.config.input.modes.find((extMode) => {
			return extMode.value === mode;
		}) || {short: 'txt'};
		const extension = modeObject.short
		const relativeFilePath = '..'  + nodebookContextDirectory + name + '.' + modeObject.short;
		const absoluteFilePath = process.cwd() + nodebookContextDirectory + name + '.' + modeObject.short;

		return {
			rootDirectory,
			nodebookContextDirectory,
			relativeSourceDirectory,
			absoluteSourceDirectory,
			relativeFilePath,
			absoluteFilePath,
			extension,
			size: (new Blob([value]).size),
			cwd: process.cwd()
		};
	}

	static createIfNotExists (
		value: string,
		name: string,
		mode: string,
		context: string
	): ISourceFileInfos {
		const fileInfos = SourceFilesService.getFileInfos({value, name, mode, context});

		if (!fs.existsSync(fileInfos.cwd + fileInfos.rootDirectory)) {
			fs.mkdirSync(fileInfos.cwd + fileInfos.rootDirectory);
		}

		if (!fs.existsSync(fileInfos.cwd + fileInfos.absoluteSourceDirectory)) {
			fs.mkdirSync(fileInfos.cwd + fileInfos.absoluteSourceDirectory);
		}

		if (!fs.existsSync(fileInfos.cwd + fileInfos.nodebookContextDirectory)) {
			fs.mkdirSync(fileInfos.cwd + fileInfos.nodebookContextDirectory);
		}

		fs.writeFileSync(
			fileInfos.cwd + fileInfos.nodebookContextDirectory + name + '.' + fileInfos.extension,
			value,
			{encoding: 'utf-8'}
		);

		return fileInfos;
	}
}
