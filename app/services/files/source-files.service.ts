import * as fs from 'fs';
import { environment } from '../../environments/environment';
import { ISourceFileInfos } from '../../shared/interfaces/source-file.interface';

export class SourceFilesService {
	static createIfNotExists (
		value: string,
		filename: string,
		mode: string,
		context: string
	): ISourceFileInfos {
		const rootDirectory = '/nodebook';
		const relativeSourceDirectory = rootDirectory + '/src/';
		const absoluteSourceDirectory = '/' + relativeSourceDirectory;
		const nodebookContextDirectory = relativeSourceDirectory + (context ? context + '/' : '');
		const modeObject = environment.config.input.modes.find((extMode) => {
			return extMode.value === mode;
		}) || {short: 'txt'};
		const relativeFilePath = '..'  + nodebookContextDirectory + filename + '.' + modeObject.short;
		const absoluteFilePath = process.cwd() + nodebookContextDirectory + filename + '.' + modeObject.short;

		if (!fs.existsSync(process.cwd() + rootDirectory)) {
			fs.mkdirSync(process.cwd() + rootDirectory);
		}

		if (!fs.existsSync(process.cwd() + absoluteSourceDirectory)) {
			fs.mkdirSync(process.cwd() + absoluteSourceDirectory);
		}

		if (!fs.existsSync(process.cwd() + nodebookContextDirectory)) {
			fs.mkdirSync(process.cwd() + nodebookContextDirectory);
		}

		fs.writeFileSync(
			process.cwd() + nodebookContextDirectory + filename + '.' + modeObject.short,
			value,
			{encoding: 'utf-8'}
		);

		return {
			nodebookContextDirectory,
			relativeSourceDirectory,
			absoluteSourceDirectory,
			relativeFilePath,
			absoluteFilePath
		};
	}
}
